import { cn } from "ui";

export type TagVariant = "merah" | "hijau" | "biru" | "kuning" | "abu";

const variants: Record<TagVariant, string> = {
  merah: "bg-merah-muda text-merah",
  hijau: "bg-hijau-muda text-hijau",
  biru: "bg-biru-muda text-biru",
  kuning: "bg-[#FEF9E7] text-[#B8860B]",
  abu: "bg-[#F5F5F5] text-[#555]",
};

interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ variant = "merah", children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
