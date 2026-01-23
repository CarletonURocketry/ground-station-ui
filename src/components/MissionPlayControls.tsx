import { useState } from "react";
import { Play, Pause, FullscreenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-lg bg-white/90 border sm:w-190 border-[#D8DADA] py-2 px-4 shadow-sm">
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
          <span className="text-sm font-mono text-gray-600 min-w-12">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimelineChange}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                (currentTime / duration) * 100
              }%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`,
            }}
          />

          <span className="text-sm font-mono text-gray-600 min-w-12">
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
