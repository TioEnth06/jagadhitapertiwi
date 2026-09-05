import Link from "next/link";
import { StatCard, StatGrid } from "@/components/shared/PageHero";

interface B2BPageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  backHref?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

export default function B2BPageHeader({
  eyebrow,
  title,
  subtitle,
  meta,
  badge,
  backHref,
  onBack,
  children,
}: B2BPageHeaderProps) {
  return (
    <div className="b2b-hero border-b border-[#990000] bg-[#CC0000] px-5 pb-6 pt-8 text-white">
      {(backHref || onBack) && (
        <div className="mb-4">
          {backHref ? (
            <Link href={backHref} className="b2b-hero-back" aria-label="Kembali">
              ←
            </Link>
          ) : (
            <button type="button" onClick={onBack} className="b2b-hero-back" aria-label="Kembali">
              ←
            </button>
          )}
        </div>
      )}

      <span className="b2b-tag">{eyebrow}</span>
      <h1 className="font-display mt-3 text-[22px] font-bold leading-snug">{title}</h1>

      {(meta || badge) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {meta && <p className="font-mono text-xs opacity-70">{meta}</p>}
          {badge && <span className="b2b-tag">{badge}</span>}
        </div>
      )}

      {subtitle && <p className="mt-2 text-sm leading-relaxed opacity-85">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function B2BStatGrid({ children }: { children: React.ReactNode }) {
  return <StatGrid>{children}</StatGrid>;
}

export function B2BStatCard({
  label,
  value,
  large,
}: {
  label: string;
  value: React.ReactNode;
  large?: boolean;
}) {
  return <StatCard label={label} value={value} large={large} variant="b2b" />;
}
