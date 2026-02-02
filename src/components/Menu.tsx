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

export const Menu = () => {
  const { toggleStats, isStatsOpen } = useAppStore();

  // Mock data for previous missions - replace with actual data later
  const previousMissions = [
    { id: 1, name: "Mission Alpha - 2025-01-15" },
    { id: 2, name: "Mission Beta - 2025-01-10" },
    { id: 3, name: "Mission Gamma - 2025-01-05" },
    { id: 4, name: "Mission Delta - 2024-12-20" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed bottom-0 left-0 sm:bottom-4 sm:left-4">
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="px-4 py-3 text-base">
              <HistoryIcon />
              Previous Missions
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {previousMissions.map((mission) => (
                <DropdownMenuItem
                  key={mission.id}
                  className="px-4 py-3 text-sm cursor-pointer"
                >
                  {mission.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

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
