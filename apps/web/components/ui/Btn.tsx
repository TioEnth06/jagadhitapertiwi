import { cn } from "ui";

type BtnVariant = "merah" | "outline" | "hijau" | "biru" | "wa" | "ghost";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  fullWidth?: boolean;
}

const variants: Record<BtnVariant, string> = {
  merah: "btn btn-merah",
  outline: "btn btn-outline",
  hijau: "btn bg-hijau text-white border-none hover:opacity-90",
  biru: "btn bg-biru text-white border-none hover:opacity-90",
  wa: "btn bg-[#25D366] text-white border-none hover:opacity-90",
  ghost: "btn bg-abu-bg text-abu-teks border border-abu-border",
};

export default function Btn({
  variant = "merah",
  fullWidth = true,
  className,
  children,
  ...props
}: BtnProps) {
  return (
    <button
      type="button"
      className={cn(variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
