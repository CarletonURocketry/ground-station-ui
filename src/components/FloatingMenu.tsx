import { useEffect, useRef, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface FloatingMenuProps {
  // Called with the new open state when the floating button toggles
  onToggleSidebar?: (open: boolean) => void;
}

export default function FloatingMenu({ onToggleSidebar }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
    const next = !open;
    setOpen(next);
    onToggleSidebar?.(next);
  }

  return (
    <div ref={ref} className="fixed left-4 bottom-4 z-[1000]">
      {/* The button is going to open a menu that spans along the right side the same length as the Telemetry Dashboard
      Starting underneath the Telemetry Header */}
      

      {/* Floating button */}
      <button
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={handleToggle}
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F0EE] border border-[#D8DADA] shadow-md hover:bg-[#E6E6E5] active:bg-[#D8DADA] transition-colors"
      >
        {open ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
