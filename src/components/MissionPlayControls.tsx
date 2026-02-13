import { useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, FullscreenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import {
  usePauseReplay,
  useStopReplay,
  useReplayStatus,
  useSeekReplay,
} from "@/lib/api/query";
import { useTelemetryStore } from "@/store/telemetryStore";

export function MissionPlayControls() {
  const {
    clientId,
    replay,
    currentState,
    setReplayPlaying,
    setCurrentState,
    setReplayLength,
    setReplayProgress,
    resetReplay,
  } = useAppStore();
  const { clearState } = useTelemetryStore();

  const pauseReplayMutation = usePauseReplay({ clientId: clientId || "" });
  const stopReplayMutation = useStopReplay({ clientId: clientId || "" });
  const seekReplayMutation = useSeekReplay(
    { clientId: clientId || "" },
    {
      onSuccess: () => {
        clearState();
      },
    }
  );



  // Poll replay status when in replay mode
  const { data: replayStatus } = useReplayStatus({
    clientId: clientId || "",
    enabled: currentState === "replay",
  });

  // Update store from polled status
  useEffect(() => {
    if (replayStatus) {
      setReplayLength(replayStatus.total_lines);
      setReplayProgress(replayStatus.current_line);
      // Sync playing state from backend
      if (replayStatus.is_playing && !replayStatus.is_paused) {
        setReplayPlaying(true);
      } else if (replayStatus.is_paused) {
        setReplayPlaying(false);
      }
    }
  }, [replayStatus, setReplayLength, setReplayProgress, setReplayPlaying]);

  const togglePlay = () => {
    if (replay.isPlaying) {
      // Pause the replay
      pauseReplayMutation.mutate(
        { paused: true },
        {
          onSuccess: () => {
            setReplayPlaying(false);
          },
        }
      );
    } else {
      // Resume the replay
      pauseReplayMutation.mutate(
        { paused: false, speed: replay.speed },
        {
          onSuccess: () => {
            setReplayPlaying(true);
          },
        }
      );
    }
  };

  const handleStop = () => {
    stopReplayMutation.mutate(undefined, {
      onSuccess: () => {
        setReplayPlaying(false);
        setCurrentState("live");
        resetReplay();
        clearState();
      },
    });
  };

  // Debounced seek handler
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSeek = useCallback(
    (position: number) => {
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
      seekTimeoutRef.current = setTimeout(() => {
        seekReplayMutation.mutate(position);
      }, 100);
    },
    [seekReplayMutation]
  );

  // Use mission time from telemetry as current time indicator
  const { data } = useTelemetryStore();
  const currentMissionTime = data.altitude_sea_level.mission_time.at(-1) ?? 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isLoading =
    pauseReplayMutation.isPending || stopReplayMutation.isPending;

  // Calculate progress percentage
  const progressPercent =
    replay.replayLength > 0
      ? (replay.progress / replay.replayLength) * 100
      : 0;

  return (
    <div className="rounded-lg bg-white/90 border sm:w-190 py-2 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          variant="default"
          size="icon-sm"
          onClick={togglePlay}
          className="rounded-full"
          disabled={isLoading}
        >
          {replay.isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Stop Button */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleStop}
          className="rounded-full"
          disabled={isLoading}
        >
          <Square className="h-4 w-4" />
        </Button>

        {/* Timeline */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground min-w-12">
            {formatTime(currentMissionTime)}
          </span>

          {/* Seekable Progress Bar */}
          <div className="flex-1 relative flex items-center h-6">
            {/* Custom Track (Background) */}
            <div className="absolute w-full h-1.5 bg-slate-100 rounded-full border border-slate-200/50" />

            {/* Custom Track (Fill) */}
            <div
              className="absolute h-1.5 bg-blue-500/30 rounded-full pointer-events-none"
              style={{ width: `${progressPercent}%` }}
            />

            {/* The actual input - transparent with styled thumb */}
            <input
              type="range"
              min={0}
              max={replay.replayLength || 100}
              value={replay.progress}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="absolute w-full h-full bg-transparent appearance-none cursor-pointer z-10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3.5
                [&::-webkit-slider-thumb]:h-3.5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-blue-500
                [&::-webkit-slider-thumb]:shadow-sm
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-moz-range-thumb]:w-3.5
                [&::-moz-range-thumb]:h-3.5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-blue-500
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-track]:bg-transparent"
              disabled={replay.replayLength === 0}
            />
          </div>

          <span className="text-sm font-mono text-muted-foreground min-w-20 text-right">
            {replay.replayLength > 0
              ? `${replay.progress}/${replay.replayLength}`
              : "--/--"}
          </span>
        </div>

        <Button size={"icon-sm"}>
          <FullscreenIcon />
        </Button>
      </div>
    </div>
  );
}

export default MissionPlayControls;
