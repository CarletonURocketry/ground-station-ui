import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { useTelemetryStore } from "@/store/telemetryStore";
import { useReplayPause, useReplaySeek } from "@/lib/api/query";

export function MissionPlayControls() {
  const { clientId, replay, setSeekingTo, setReplayPaused } = useAppStore();
  const { clearState } = useTelemetryStore();
  const { mutate: pause } = useReplayPause({ clientId: clientId || "" });
  const { mutate: seek } = useReplaySeek({ clientId: clientId || "" });

  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  const currentValue = isDragging ? dragValue : replay.progress;

  function handleTogglePause() {
    const next = !replay.isPaused;
    pause(next, { onSuccess: () => setReplayPaused(next) });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsDragging(true);
    setDragValue(Number(e.target.value));
  }

  function handlePointerUp() {
    if (!isDragging) return;
    clearState();
    setSeekingTo(dragValue);
    seek(dragValue);
    setIsDragging(false);
  }

  return (
    <div className="rounded-lg bg-white/90 border sm:w-190 py-2 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="default"
          size="icon-sm"
          className="rounded-full"
          onClick={handleTogglePause}
        >
          {replay.isPaused ? (
            <Play className="h-5 w-5 ml-0.5" />
          ) : (
            <Pause className="h-5 w-5" />
          )}
        </Button>

        <input
          type="range"
          min="0"
          max={replay.replayLength || 1}
          value={currentValue}
          onChange={handleChange}
          onPointerUp={handlePointerUp}
          className="flex-1 h-2 bg-background border rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
}

export default MissionPlayControls;
