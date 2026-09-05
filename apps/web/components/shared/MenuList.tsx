import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

export interface MenuItemConfig {
  id: string;
  label: string;
  description?: string;
  Icon: LucideIcon;
  onClick: () => void;
}

interface MenuListProps {
  items: MenuItemConfig[];
  variant?: "app" | "b2b";
}

export default function MenuList({ items, variant = "app" }: MenuListProps) {
  const isB2b = variant === "b2b";

  return (
    <div className={isB2b ? "b2b-menu-list" : "app-menu-list"}>
      {items.map(({ id, label, description, Icon, onClick }) => (
        <button
          key={id}
          type="button"
          onClick={onClick}
          className={isB2b ? "b2b-menu-item" : "app-menu-item"}
        >
          <div className={isB2b ? "b2b-icon-box h-10 w-10" : "app-icon-box"}>
            <Icon size={18} />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-semibold">{label}</p>
            {description && (
              <p className={`text-xs ${isB2b ? "text-[var(--landing-abu-teks)]" : "text-abu-teks"}`}>
                {description}
              </p>
            )}
          </div>
          <ChevronRight
            size={18}
            className={isB2b ? "b2b-accent shrink-0" : "shrink-0 text-merah"}
          />
        </button>
      ))}
    </div>
  );
}
