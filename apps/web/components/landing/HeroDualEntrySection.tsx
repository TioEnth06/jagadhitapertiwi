"use client";
import Link from 'next/link'
import EntryCard from './EntryCard'
import WhatsAppIcon from './WhatsAppIcon'
import { WHATSAPP_URL_DAFTAR, WHATSAPP_URL_KORPORAT } from '@/lib/constants/landing'
import { statistikKoperasi } from '@/lib/data/mockData'

const proofAvatars = [
  { inisial: 'SK', warna: '#1A7F3C' },
  { inisial: 'BM', warna: '#CC0000' },
  { inisial: 'HR', warna: '#B8860B' },
  { inisial: 'PT', warna: '#2563EB' },
]

export default function HeroDualEntrySection() {
  return (
    <section>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center px-[clamp(1.25rem,6%,4rem)] lg:grid-cols-[55%_45%]">
        <div className="py-12 text-center lg:py-20 lg:pr-12 lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--landing-merah)]">
            <span className="h-0.5 w-7 bg-[var(--landing-merah)]" />
            Platform Koperasi Digital Indonesia
          </div>
          <h1 className="font-landing-display mb-5 text-[clamp(2.25rem,4.2vw,3.625rem)] font-bold leading-[1.1] tracking-tight text-[var(--landing-hitam)]">
            Ekonomi petani yang{' '}
            <span className="text-[var(--landing-merah)]">tumbuh bersama,</span> dikelola bersama
          </h1>
          <p className="mx-auto mb-9 max-w-md text-[17px] leading-relaxed text-[var(--landing-abu-teks)] lg:mx-0">
            Satu platform untuk simpanan, pinjaman, jual-beli hasil tani, dan musyawarah anggota.
            Terbuka untuk petani individu maupun perusahaan yang ingin bermitra.
          </p>
          <div className="mb-12 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/login"
              className="inline-block rounded-[10px] bg-[var(--landing-merah)] px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-[var(--landing-merah-gelap)]"
            >
              Daftar Sebagai Anggota
            </Link>
            <a
              href={WHATSAPP_URL_DAFTAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-[var(--landing-abu-border)] bg-white px-6 py-3.5 text-[15px] font-semibold text-[var(--landing-teks)] no-underline transition-colors hover:border-[#25D366] hover:bg-[#f0fff5]"
            >
              <WhatsAppIcon size={18} className="text-[#25D366]" />
              Daftar via WhatsApp
            </a>
          </div>
          <div className="flex items-center justify-center gap-3.5 lg:justify-start">
            <div className="flex">
              {proofAvatars.map(({ inisial, warna }, i) => (
                <span
                  key={inisial}
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white"
                  style={{ background: warna, marginLeft: i === 0 ? 0 : -7 }}
                >
                  {inisial}
                </span>
              ))}
            </div>
            <p className="text-left text-[13px] leading-snug text-[var(--landing-abu-teks)]">
              <strong className="font-semibold text-[var(--landing-teks)]">
                {statistikKoperasi.anggotaAktif.toLocaleString('id-ID')} anggota aktif
              </strong>
              <br />
              individu &amp; korporat
            </p>
          </div>
        </div>

        <div
          id="korporat"
          className="flex flex-col gap-4 border-[var(--landing-abu-border)] py-12 lg:border-l lg:py-20 lg:pl-10"
        >
          <EntryCard
            variant="individu"
            tag="Anggota Individu"
            title="Untuk petani & UMKM tani"
            description="Kelola simpanan, ajukan pinjaman modal, dan pasarkan hasil tani Anda langsung ke pembeli."
            features={[
              'Simpan & tarik kapan saja',
              'Pinjaman modal tani mulai Rp 500 ribu',
              'Jual produk di marketplace',
              'Daftar gratis via WhatsApp',
            ]}
            cta="Daftar sebagai petani"
            href="/login"
          />
          <EntryCard
            variant="korporat"
            tag="Anggota Korporat"
            title="Untuk perusahaan & institusi"
            description="Akses pasokan produk tani skala besar, buat Purchase Order resmi, dan manfaatkan fasilitas pinjaman korporat."
            features={[
              'Pinjaman korporat s/d Rp 250 juta',
              'Purchase Order & LOI resmi',
              'Harga grosir & negosiasi langsung',
              'Dashboard B2B terpisah',
            ]}
            cta="Daftar sebagai mitra korporat"
            href={WHATSAPP_URL_KORPORAT}
            external
          />
        </div>
      </div>
    </section>
  )
}
