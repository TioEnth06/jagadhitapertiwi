"use client";
import { useState } from 'react'
import SectionEyebrowLanding from './SectionEyebrowLanding'

type TabId = 'individu' | 'korporat'

const stepsIndividu = [
  {
    num: '1',
    title: 'Chat WhatsApp JDP',
    desc: 'Kirim pesan ke nomor resmi koperasi. Bot kami memandu pendaftaran langkah demi langkah.',
  },
  {
    num: '2',
    title: 'Isi data & kirim KTP',
    desc: 'Foto KTP dikirim langsung lewat WhatsApp. Tidak perlu datang ke kantor atau scan di tempat khusus.',
  },
  {
    num: '3',
    title: 'Verifikasi pengurus',
    desc: 'Pengurus memverifikasi data dalam 1–3 hari kerja dan mengirim nomor anggota via WhatsApp.',
  },
  {
    num: '4',
    title: 'Mulai bertransaksi',
    desc: 'Setor simpanan pokok, langsung bisa akses semua fitur platform JDP.',
  },
]

const stepsKorporat = [
  {
    num: '1',
    title: 'Hubungi tim JDP',
    desc: 'Isi form pendaftaran korporat atau hubungi langsung tim partnership kami via WhatsApp/email.',
  },
  {
    num: '2',
    title: 'Kirim dokumen legal',
    desc: 'Upload akta perusahaan, NPWP, dan KTP PIC melalui portal dokumen yang kami sediakan.',
  },
  {
    num: '3',
    title: 'Review & penandatanganan',
    desc: 'Tim JDP meninjau dokumen dan menyiapkan perjanjian kemitraan. Proses 3–5 hari kerja.',
  },
  {
    num: '4',
    title: 'Akses dashboard B2B',
    desc: 'Akun korporat aktif. PO, negosiasi harga, dan pinjaman korporat siap digunakan.',
  },
]

export default function CaraBergabungSection() {
  const [tab, setTab] = useState<TabId>('individu')
  const steps = tab === 'individu' ? stepsIndividu : stepsKorporat

  return (
    <section id="cara-kerja" className="bg-[var(--landing-abu-bg)] py-24">
      <div className="landing-section-wrap">
        <SectionEyebrowLanding>Bergabung itu mudah</SectionEyebrowLanding>
        <h2 className="landing-section-title">Pilih jalur Anda</h2>
        <p className="landing-section-sub">
          Proses pendaftaran berbeda untuk anggota individu dan korporat — semua bisa dimulai dari
          WhatsApp.
        </p>

        <div
          role="tablist"
          aria-label="Jalur pendaftaran"
          className="mt-12 flex border-b-2 border-[var(--landing-abu-border)]"
        >
          {(
            [
              { id: 'individu' as const, label: 'Anggota Individu' },
              { id: 'korporat' as const, label: 'Anggota Korporat' },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              onClick={() => setTab(id)}
              className={`-mb-0.5 border-b-2 px-7 py-3 text-sm font-semibold transition-colors ${
                tab === id
                  ? 'border-[var(--landing-merah)] text-[var(--landing-merah)]'
                  : 'border-transparent text-[var(--landing-abu-teks)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {steps.map(({ num, title, desc }, i) => (
            <div key={num} className="relative lg:pr-7">
              {i < steps.length - 1 && (
                <span
                  className="absolute right-0 top-5 hidden text-lg text-[var(--landing-abu-border)] lg:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] bg-white font-landing-mono text-sm font-medium ${
                  tab === 'korporat'
                    ? 'border-[var(--landing-b2b)] text-[var(--landing-b2b)]'
                    : 'border-[var(--landing-abu-border)] text-[var(--landing-teks)]'
                }`}
              >
                {num}
              </div>
              <h4 className="mb-2 text-[15px] font-bold text-[var(--landing-hitam)]">{title}</h4>
              <p className="text-[13px] leading-relaxed text-[var(--landing-abu-teks)]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
