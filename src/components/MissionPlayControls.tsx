import { useState } from "react";
import { Play, Pause, FullscreenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// TODO: Rewrite this. For now it's just placeholder to see how it looks on the UI
export function MissionPlayControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(100); // Mock duration for now

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Future: Implement actual play/pause functionality
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
    // Future: Implement seeking functionality
    console.log(e.target.value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-lg bg-white/90 border sm:w-190 py-2 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          variant="default"
          size="icon-sm"
          onClick={togglePlay}
          className="rounded-full"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Timeline */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground min-w-12">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimelineChange}
            className="flex-1 h-2 bg-background border rounded-lg appearance-none cursor-pointer accent-primary"
          />

          <span className="text-sm font-mono text-muted-foreground min-w-12">
            {formatTime(duration)}
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
