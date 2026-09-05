"use client";

import Link from "next/link";

interface TopBarProps {
  title: string;
  backHref?: string;
  onBack?: () => void;
  variant?: "default" | "b2b";
}

export default function TopBar({ title, backHref, onBack, variant = "default" }: TopBarProps) {
  const isB2b = variant === "b2b";
  const backClass = isB2b
    ? "b2b-topbar-back"
    : "bg-abu-bg text-[#111]";
  const containerClass = "border-b border-[var(--landing-abu-border)] bg-white";
  const titleClass = "font-display text-[17px] font-bold text-[#111]";

  return (
    <div className={`flex items-center gap-3 px-5 pb-3.5 pt-[52px] ${containerClass}`}>
      {backHref ? (
        <Link
          href={backHref}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base ${backClass}`}
          aria-label="Kembali"
        >
          ←
        </Link>
      ) : onBack ? (
        <button
          type="button"
          onClick={onBack}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base ${backClass}`}
          aria-label="Kembali"
        >
          ←
        </button>
      ) : null}
      <h1 className={titleClass}>{title}</h1>
    </div>
  );
}
