import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MiniStatCardProps {
  label: string;
  value: React.ReactNode;
  subtext?: string;
  chart?: React.ReactNode;
  color?: string;
  mocked?: boolean;
}

export function MiniStatCard({
  label,
  value,
  subtext,
  chart,
  color,
  mocked,
}: MiniStatCardProps) {
  return (
    <Card className="bg-stats-card-bg border-stats-card-border relative gap-0 rounded-xl border p-1.5 py-3 shadow-none">
      <CardContent className="p-0">
        {mocked && (
          <span className="absolute top-1 right-1 text-[7px] text-stats-mock-badge font-black uppercase tracking-tighter">
            mock
          </span>
        )}
        <div className="text-[8px] text-stats-label font-black uppercase tracking-widest mb-0.5">
          {label}
        </div>
        <div
          className={cn("text-base font-black", !color && "text-stats-value")}
          style={color ? { color } : undefined}
        >
          {value}
        </div>
        {subtext && (
          <div className="text-[8px] text-stats-label mt-0.5 font-bold opacity-80">
            {subtext}
          </div>
        )}
        {chart && <div className="mt-1">{chart}</div>}
      </CardContent>
    </Card>
  );
}
