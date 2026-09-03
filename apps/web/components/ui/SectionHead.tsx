import Link from "next/link";

interface SectionHeadProps {
  title: string;
  href?: string;
  linkLabel?: string;
  onLinkClick?: () => void;
}

export default function SectionHead({
  title,
  href,
  linkLabel = "Lihat semua",
  onLinkClick,
}: SectionHeadProps) {
  return (
    <div className="flex items-center justify-between px-5 pb-2.5 pt-[18px]">
      <h3 className="text-[13px] font-bold uppercase tracking-wide text-abu-teks">{title}</h3>
      {href ? (
        <Link href={href} className="text-[13px] font-semibold text-merah">
          {linkLabel}
        </Link>
      ) : onLinkClick ? (
        <button type="button" onClick={onLinkClick} className="text-[13px] font-semibold text-merah">
          {linkLabel}
        </button>
      ) : null}
    </div>
  );
}
