import type { ReactNode } from "react";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  onExecute?: () => void;
  disabled?: boolean;
  group?: string;
}

interface SideBarProps {
  items?: CommandItem[];
  className?: string;
}

export default function SideBar({ items = [], className = "" }: SideBarProps) {
  // Group items by `group` (optional)
  const groups: Record<string, CommandItem[]> = {};
  items.forEach((it) => {
    const key = it.group || "_default";
    if (!groups[key]) groups[key] = [];
    groups[key].push(it);
  });

  return (
    <aside
      className={`w-64 min-h-0 bg-white border-r border-[#D8DADA] p-3 flex flex-col gap-3 ${className}`}
      aria-label="Commands sidebar"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Commands</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.keys(groups).map((groupKey) => (
          <div key={groupKey} className="mb-4 last:mb-0">
            {groupKey !== "_default" && (
              <div className="text-xs text-gray-500 mb-2 uppercase">{groupKey}</div>
            )}

            <ul className="space-y-1">
              {groups[groupKey].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => !item.disabled && item.onExecute?.()}
                    disabled={item.disabled}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-left hover:bg-[#F1F0EE] focus:outline-none focus:ring-1 focus:ring-[#D8DADA] ${
                      item.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {item.icon && <span className="text-gray-600">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 truncate">{item.description}</div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}