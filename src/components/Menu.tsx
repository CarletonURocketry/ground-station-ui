import { MenuIcon, HistoryIcon, CircleIcon, ActivityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/appStore";
import { useMissions, useStartReplay, useStopReplay } from "@/lib/api/query";
import { MissionsLoadingSkeleton } from "@/components/skeletons/MissionsLoadingSkeleton";
import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useTelemetryStore } from "@/store/telemetryStore";

export const Menu = () => {
  const {
    toggleStats,
    isStatsOpen,
    clientId,
    replay,
    setReplayPlaying,
    setCurrentState,
    resetReplay,
  } = useAppStore();
  const { clearState } = useTelemetryStore();
  const { isConnected } = useWebSocketContext();
  const { isPending: isMissionsPending, data: missions } = useMissions(
    {
      clientId: clientId || "",
    },
    {
      enabled: isConnected && !!clientId,
    }
  );
  const { mutate: startReplay } = useStartReplay({ clientId: clientId || "" });
  const { mutate: stopReplay } = useStopReplay({ clientId: clientId || "" });

  function handleStartReplay(replayPath: string) {
    if (replay.isPlaying) return;
    clearState(); // Reset charts before starting replay
    startReplay(replayPath);
    setReplayPlaying(true);
    setCurrentState("replay");
  }


  function handleStopReplay() {
    if (!replay.isPlaying) return;
    stopReplay();
    resetReplay();
    clearState();
    setReplayPlaying(false);
    setCurrentState("live");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="fixed bottom-0 left-0 sm:bottom-4 sm:left-4">
        <Button
          variant="default"
          size={"icon-xl"}
          className="rounded-full cursor-pointer"
        >
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuGroup>
          {replay.isPlaying ? (
            <DropdownMenuItem
              className="px-4 py-3 text-base cursor-pointer"
              onClick={handleStopReplay}
            >
              <HistoryIcon />
              Stop Replay
            </DropdownMenuItem>
          ) : (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-4 py-3 text-base">
                <HistoryIcon />
                Previous Missions
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {isMissionsPending ? (
                  <MissionsLoadingSkeleton />
                ) : missions && missions.length > 0 ? (
                  missions.map((mission) => (
                    <DropdownMenuItem
                      key={mission.path}
                      className="px-4 py-3 text-sm cursor-pointer"
                      onClick={() => handleStartReplay(mission.path)}
                    >
                      {mission.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="px-4 py-3 text-sm" disabled>
                    No missions available
                  </DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem className="px-4 py-3 text-base cursor-pointer">
            <CircleIcon className="fill-red-500 text-red-500" />
            Start Recording
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="px-4 py-3 text-base cursor-pointer"
            onClick={toggleStats}
          >
            <ActivityIcon />
            {isStatsOpen ? "Hide" : "Show"} Stats for Nerds
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
