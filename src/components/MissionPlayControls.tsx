import { useState } from "react";
import { Play, Pause, FullscreenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { useReplaySeek } from "@/lib/api/query";

export function MissionPlayControls() {
  const { clientId, replay } = useAppStore();
  const { mutate: seek } = useReplaySeek({ clientId: clientId || "" });

  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  const currentValue = isDragging ? dragValue : replay.progress;
  const total = replay.replayLength;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsDragging(true);
    setDragValue(Number(e.target.value));
  }

  function handlePointerUp() {
    if (!isDragging) return;
    seek(dragValue);
    setIsDragging(false);
  }

  return (
    <div className="rounded-lg bg-white/90 border sm:w-190 py-2 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="default" size="icon-sm" className="rounded-full" disabled>
          {replay.isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground min-w-12">
            {currentValue}
          </span>

          <input
            type="range"
            min="0"
            max={total || 1}
            value={currentValue}
            onChange={handleChange}
            onPointerUp={handlePointerUp}
            className="flex-1 h-2 bg-background border rounded-lg appearance-none cursor-pointer accent-primary"
          />

          <span className="text-sm font-mono text-muted-foreground min-w-12">
            {total}
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
