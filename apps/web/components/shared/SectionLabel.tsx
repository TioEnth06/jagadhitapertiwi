interface SectionLabelProps {
  title: string;
  variant?: "merah" | "neutral";
  className?: string;
}

export default function SectionLabel({
  title,
  variant = "merah",
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={
        variant === "merah"
          ? `app-section-label ${className}`
          : `app-section-label-neutral ${className}`
      }
    >
      {title}
    </div>
  );
}
