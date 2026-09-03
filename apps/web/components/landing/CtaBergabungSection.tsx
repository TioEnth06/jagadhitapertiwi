"use client";
import Link from 'next/link'
import { WHATSAPP_URL_DAFTAR, WHATSAPP_URL_KORPORAT } from '@/lib/constants/landing'
import WhatsAppIcon from './WhatsAppIcon'

export default function CtaBergabungSection() {
  return (
    <section className="bg-[var(--landing-merah)] px-[clamp(1.25rem,6%,4rem)] py-20 text-center">
      <h2 className="font-landing-display mx-auto mb-4 max-w-2xl text-[clamp(1.75rem,3.5vw,2.875rem)] font-bold leading-tight tracking-tight text-white">
        Bergabung sekarang,
        <br />
        gratis selamanya
      </h2>
      <p className="mx-auto mb-9 max-w-lg text-base leading-relaxed text-white/80">
        Keanggotaan tidak dipungut biaya. Kami hanya mengambil fee kecil saat transaksi terjadi —
        artinya kami untung hanya jika Anda untung.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/login"
          className="inline-block rounded-[10px] bg-white px-8 py-3.5 text-[15px] font-bold text-[var(--landing-merah)] no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        >
          Daftar Sebagai Petani
        </Link>
        <a
          href={WHATSAPP_URL_DAFTAR}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-white/50 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors hover:border-white hover:bg-white/10"
        >
          <WhatsAppIcon size={17} />
          Daftar via WhatsApp
        </a>
        <a
          href={WHATSAPP_URL_KORPORAT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-white/50 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors hover:border-white hover:bg-white/10"
        >
          Hubungi Tim Korporat
        </a>
      </div>
    </section>
  )
}
