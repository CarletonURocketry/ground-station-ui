interface TelemetryValueProps {
  label: string;
  value: string | number;
}

export function TelemetryValue({ label, value }: TelemetryValueProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-mono font-medium text-sm md:text-base">
        {value}
      </span>
    </div>
  );
}
