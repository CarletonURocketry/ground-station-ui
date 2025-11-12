import { useEffect, useRef, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import replayIcon from "../assets/replay.svg";
import recordIcon from "../assets/record.svg";
import { useWebSocketContext } from "../contexts/WebSocketContext";

interface FloatingMenuProps {
  onOpenReplay?: () => void;
}

export default function FloatingMenu({ onOpenReplay }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { sendCommand } = useWebSocketContext();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function handleToggle(e?: React.MouseEvent) {
    e?.stopPropagation();
    setOpen((s) => !s);
  }

  return (
    <div ref={ref} className="fixed left-4 bottom-4 z-[1000] flex items-start flex-col">
      {/* Popup panel above the button */}
      <div
        className={`mb-2 w-25 bg-white border border-[#D8DADA] rounded-lg shadow-lg overflow-hidden transition-opacity duration-150 origin-bottom-left ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!open}
      >
        <div className="p-1">
          <ul className="space-y-1">
            <li>
              <button
                className="w-full text-left px-2 py-2 rounded-md hover:bg-[#F1F0EE] flex items-center"
                onClick={() => {
                  setOpen(false);
                  // Send the replay command for july_12th
                  if (!playing){
                    sendCommand("telemetry replay play july_12th");
                    setPlaying(true);
                  }else{
                    sendCommand("telemetry replay stop");
                    setPlaying(false);
                  }
                  onOpenReplay?.();
                }}
              >
                <img src={replayIcon} alt="Replay" className="w-4 h-4 mr-2" />
                <span>Replay</span>
              </button>
            </li>
            {IS_ADMIN && (
              <li>
                <button
                  className="w-full text-left px-2 py-2 rounded-md hover:bg-[#F1F0EE] flex items-center"
                  onClick={() => {
                    setOpen(false);
                    // Placeholder for additional menu actions
                    console.log("Record clicked");
                  }}
                >
                  <img src={recordIcon} alt="Record" className="w-4 h-4 mr-2" />
                  <span>Record</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Floating button */}
      <button
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={handleToggle}
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#D8DADA] shadow-md hover:bg-[#E6E6E5] active:bg-[#D8DADA] transition-colors"
      >
        {open ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
