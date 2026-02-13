interface StatsForNerdsFooterProps {
  dataPointsCount: number;
}

export function StatsForNerdsFooter({
  dataPointsCount,
}: StatsForNerdsFooterProps) {
  return (
    <div className="flex-shrink-0 px-2.5 py-1 bg-stats-header-footer-bg border-t border-stats-header-footer-border text-[9px] text-stats-label flex justify-between font-bold">
      <span>Ground Station UI</span>
      <span>{dataPointsCount} data points</span>
    </div>
  );
}
