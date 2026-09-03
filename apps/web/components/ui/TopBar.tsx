"use client";

import Link from "next/link";

interface TopBarProps {
  title: string;
  backHref?: string;
  onBack?: () => void;
}

export default function TopBar({ title, backHref, onBack }: TopBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-abu-border bg-white px-5 pb-3.5 pt-[52px]">
      {backHref ? (
        <Link
          href={backHref}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-abu-bg text-base"
          aria-label="Kembali"
        >
          ←
        </Link>
      ) : onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-abu-bg text-base"
          aria-label="Kembali"
        >
          ←
        </button>
      ) : null}
      <h1 className="text-[17px] font-bold text-[#111]">{title}</h1>
    </div>
  );
}
