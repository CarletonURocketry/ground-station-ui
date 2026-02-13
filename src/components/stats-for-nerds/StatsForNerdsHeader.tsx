import { X } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export function StatsForNerdsHeader() {
  const { setIsStatsOpen } = useAppStore();

  return (
    <div className="flex-shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-stats-header-footer-bg border-b border-stats-header-footer-border">
      <span className="text-[9px] font-black tracking-widest text-stats-value">
        STATS FOR NERDS
      </span>
      <button
        type="button"
        onClick={() => setIsStatsOpen(false)}
        className="text-stats-label hover:text-stats-value transition-colors p-0.5 hover:bg-stats-card-bg rounded-lg"
      >
        <X size={14} />
      </button>
    </div>
  );
}
