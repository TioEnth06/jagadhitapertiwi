import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  className?: string;
}

export default function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return <p className={`section-eyebrow ${className}`}>{children}</p>;
}
