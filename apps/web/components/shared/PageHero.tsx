interface PageHeroProps {
  variant?: "merah" | "hijau";
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  meta?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  variant = "merah",
  eyebrow,
  title,
  subtitle,
  meta,
  children,
}: PageHeroProps) {
  const heroClass = variant === "hijau" ? "app-hero-hijau" : "app-hero-merah";

  return (
    <div className={`${heroClass} px-5 pb-6 pt-8`}>
      {eyebrow && <p className="text-sm opacity-80">{eyebrow}</p>}
      <div className={eyebrow ? "mt-1" : ""}>{title}</div>
      {meta && <p className="mt-1 font-mono text-xs opacity-70">{meta}</p>}
      {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function StatGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>{children}</div>
  );
}

type StatVariant = "app" | "b2b";

export function StatCard({
  label,
  value,
  large,
  compact,
  variant = "app",
}: {
  label: string;
  value: React.ReactNode;
  large?: boolean;
  compact?: boolean;
  variant?: StatVariant;
}) {
  if (variant === "b2b") {
    return (
      <div className="b2b-stat-card">
        <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{label}</p>
        <div className={`b2b-stat-value ${large ? "b2b-stat-value-lg" : ""}`}>{value}</div>
      </div>
    );
  }

  return (
    <div className={compact ? "app-stat-card-sm" : "app-stat-card"}>
      <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{label}</p>
      <div
        className={`mt-1 font-mono font-bold leading-tight ${compact ? "text-sm" : "text-sm md:text-base"}`}
      >
        {value}
      </div>
    </div>
  );
}
