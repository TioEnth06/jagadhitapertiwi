"use client";
import { useRef, useState } from 'react'
import type { KategoriPengumuman, Pengumuman } from '@/lib/types'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import UnsplashImage from '@/components/ui/UnsplashImage'
import DemoToast from '@/components/ui/DemoToast'
import { useDemoToast } from '@/lib/hooks/useDemoToast'

const labelKategori: Record<KategoriPengumuman, string> = {
  pengumuman: 'Pengumuman',
  agenda: 'Agenda',
  peringatan: 'Peringatan',
  promo: 'Promo',
}

interface PengumumanBannerProps {
  items: Pengumuman[]
}

export default function PengumumanBanner({ items }: PengumumanBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { message, showToast, dismiss } = useDemoToast()

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cards = el.querySelectorAll('article')
    if (cards.length === 0) return

    let closest = 0
    let minDist = Infinity
    cards.forEach((card, index) => {
      const dist = Math.abs(card.getBoundingClientRect().left - el.getBoundingClientRect().left)
      if (dist < minDist) {
        minDist = dist
        closest = index
      }
    })
    setActiveIndex(closest)
  }

  return (
    <div>
      <SectionEyebrow>Pengumuman & Info</SectionEyebrow>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Pengumuman koperasi, geser ke samping untuk melihat lainnya"
        aria-roledescription="carousel"
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className="premium-card w-[88%] shrink-0 snap-start overflow-hidden border-0 p-0"
            aria-label={`${index + 1} dari ${items.length}: ${item.judul}`}
          >
            <div className="relative h-36">
              <UnsplashImage
                src={item.gambar}
                alt=""
                className="h-full w-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-teks-utama/85 via-teks-utama/35 to-teks-utama/10"
                aria-hidden="true"
              />
              <span className="absolute left-3 top-3 inline-block rounded-full bg-white/95 px-2 py-0.5 text-xs font-semibold text-merah-utama shadow-sm backdrop-blur-sm">
                {labelKategori[item.kategori]}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 pt-8 text-white">
                <p className="font-semibold leading-snug">{item.judul}</p>
                <p className="mt-1 text-sm text-white/85">{item.isi}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-l-4 border-l-merah-utama bg-gradient-to-r from-merah-muda/40 to-white px-4 py-3">
              <button
                type="button"
                onClick={() => showToast(item.detail)}
                className="text-sm font-semibold text-merah-utama"
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
        <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? 'w-4 bg-merah-utama' : 'w-1.5 bg-abu-sedang'
              }`}
            />
          ))}
        </div>
      )}

      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  )
}
