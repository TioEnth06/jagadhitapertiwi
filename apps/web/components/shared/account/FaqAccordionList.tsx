import type { FaqItem } from "@/lib/types";

interface FaqAccordionListProps {
  items: FaqItem[];
  variant?: "app" | "b2b";
}

export default function FaqAccordionList({ items, variant = "app" }: FaqAccordionListProps) {
  const isB2b = variant === "b2b";

  return (
    <>
      {items.map((f) => (
        <details key={f.id} className={isB2b ? "b2b-card p-4" : "app-card p-4"}>
          <summary className="cursor-pointer text-sm font-semibold leading-snug">
            {f.pertanyaan}
          </summary>
          <p
            className={`mt-3 text-sm leading-relaxed ${isB2b ? "text-[var(--landing-abu-teks)]" : "text-abu-teks"}`}
          >
            {f.jawaban}
          </p>
        </details>
      ))}
    </>
  );
}
