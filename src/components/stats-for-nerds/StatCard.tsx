import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string;
  chart?: React.ReactNode;
  subtext?: string;
  trend?: "up" | "down" | "flat";
}

export function StatCard({
  label,
  value,
  chart,
  subtext,
  trend,
}: StatCardProps) {
  return (
    <Card className="bg-stats-card-bg border-stats-card-border gap-0 rounded-xl border p-2 py-4 shadow-none">
      <CardContent className="flex flex-row items-center justify-between p-0">
        <div className="flex-1">
          <div className="text-[8px] text-stats-label font-black uppercase tracking-widest mb-0.5">
            {label}
          </div>
          <div className="text-xl font-black text-stats-value flex items-center gap-1.5">
            {value}
            {trend && trend !== "flat" && (
              <span
                className={cn(
                  "text-sm",
                  trend === "up" ? "text-stats-success" : "text-stats-danger"
                )}
              >
                {trend === "up" ? "↑" : "↓"}
              </span>
            )}
          </div>
          {subtext && (
            <div className="text-[8px] text-stats-label mt-0.5 font-bold opacity-80">
              {subtext}
            </div>
          )}
        </div>
        {chart && <div className="ml-2">{chart}</div>}
      </CardContent>
    </Card>
  );
}
