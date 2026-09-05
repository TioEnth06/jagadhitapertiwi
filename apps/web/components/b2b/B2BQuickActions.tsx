import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface QuickAction {
  label: string;
  href: string;
  Icon: LucideIcon;
}

interface B2BQuickActionsProps {
  actions: QuickAction[];
}

export default function B2BQuickActions({ actions }: B2BQuickActionsProps) {
  return (
    <div className={`grid gap-3 ${actions.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
      {actions.map(({ label, href, Icon }) => (
        <Link key={href} href={href} className="flex flex-col items-center gap-2">
          <div className="b2b-quick-icon">
            <Icon size={22} strokeWidth={1.8} />
          </div>
          <span className="text-center text-[11px] font-semibold leading-tight text-[var(--landing-teks)]">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
