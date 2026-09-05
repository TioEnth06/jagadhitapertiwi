"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { KategoriPengumuman, Pengumuman } from "@/lib/types";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import UnsplashImage from "@/components/ui/UnsplashImage";
import DemoToast from "@/components/ui/DemoToast";
import { useDemoToast } from "@/lib/hooks/useDemoToast";

const labelKategori: Record<KategoriPengumuman, string> = {
  pengumuman: "Pengumuman",
  agenda: "Agenda",
  peringatan: "Peringatan",
  promo: "Promo",
};

interface PengumumanBannerProps {
  items: Pengumuman[];
}

export default function PengumumanBanner({ items }: PengumumanBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { message, showToast, dismiss } = useDemoToast();

  const handleDetail = (item: Pengumuman) => {
    if (item.kategori === "peringatan" && item.judul.toLowerCase().includes("voting")) {
      router.push("/voting");
      return;
    }
    showToast(item.detail);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("article");
    if (cards.length === 0) return;

    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, index) => {
      const dist = Math.abs(card.getBoundingClientRect().left - el.getBoundingClientRect().left);
      if (dist < minDist) {
        minDist = dist;
        closest = index;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section>
      <SectionEyebrow>Pengumuman & Info</SectionEyebrow>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-scroll mt-3"
        role="region"
        aria-label="Pengumuman koperasi"
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className="app-card w-[85%] shrink-0 snap-start overflow-hidden p-0"
            aria-label={`${index + 1} dari ${items.length}: ${item.judul}`}
          >
            <div className="relative h-36">
              <UnsplashImage
                src={item.gambar}
                alt=""
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-merah shadow-sm">
                {labelKategori[item.kategori]}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-semibold leading-snug">{item.judul}</p>
                <p className="mt-1 line-clamp-2 text-sm text-white/85">{item.isi}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-l-4 border-l-merah bg-merah-muda/50 px-4 py-3">
              <button
                type="button"
                onClick={() => handleDetail(item)}
                className="text-sm font-semibold text-merah"
              >
                Selengkapnya →
              </button>
              <span className="text-xs text-abu-teks">
                {index + 1}/{items.length}
              </span>
            </div>
          </article>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-4 bg-merah" : "w-1.5 bg-abu-border"
              }`}
            />
          ))}
        </div>
      )}

      <DemoToast message={message} onDismiss={dismiss} />
    </section>
  );
}
