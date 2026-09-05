import Link from "next/link";

interface SectionHeadProps {
  title: string;
  href?: string;
  linkLabel?: string;
  onLinkClick?: () => void;
  inset?: boolean;
}

export default function SectionHead({
  title,
  href,
  linkLabel = "Lihat semua",
  onLinkClick,
  inset = false,
}: SectionHeadProps) {
  return (
    <div
      className={`flex items-center justify-between pb-2.5 pt-1 ${inset ? "" : "px-5 pt-[18px]"}`}
    >
      <h3 className="app-section-label-neutral !normal-case !tracking-wide">{title}</h3>
      {href ? (
        <Link href={href} className="app-link-merah shrink-0 text-[13px]">
          {linkLabel}
        </Link>
      ) : onLinkClick ? (
        <button type="button" onClick={onLinkClick} className="app-link-merah shrink-0 text-[13px]">
          {linkLabel}
        </button>
      ) : null}
    </div>
  );
}
