import Link from "next/link";

interface B2BSectionProps {
  title: string;
  href?: string;
  linkLabel?: string;
  onLinkClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function B2BSection({
  title,
  href,
  linkLabel,
  onLinkClick,
  className = "",
  children,
}: B2BSectionProps) {
  return (
    <section className={className}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="b2b-section-label">{title}</div>
        {href ? (
          <Link href={href} className="b2b-link shrink-0">
            {linkLabel ?? "Lihat semua"}
          </Link>
        ) : linkLabel && onLinkClick ? (
          <button type="button" onClick={onLinkClick} className="b2b-link shrink-0">
            {linkLabel}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}
