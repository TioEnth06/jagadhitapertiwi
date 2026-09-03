import type { ReactNode } from 'react'
import { Wallet, Banknote, ShoppingBag, Monitor, Users, Vote } from 'lucide-react'
import SectionEyebrowLanding from './SectionEyebrowLanding'

interface FiturItem {
  icon: ReactNode
  title: string
  description: string
  b2b?: boolean
}

const fiturList: FiturItem[] = [
  {
    icon: <Wallet size={22} className="text-[var(--landing-merah)]" />,
    title: 'Simpanan digital',
    description:
      'Setor dan pantau simpanan wajib, pokok, dan sukarela. Riwayat lengkap tersedia kapan saja.',
  },
  {
    icon: <Banknote size={22} className="text-[var(--landing-merah)]" />,
    title: 'Pinjaman modal tani',
    description:
      'Ajukan pinjaman online, hitung cicilan otomatis, pantau status tanpa perlu datang ke kantor.',
  },
  {
    icon: <ShoppingBag size={22} className="text-[var(--landing-merah)]" />,
    title: 'Pasar hasil tani',
    description:
      'Jual beras, sayur, buah, madu, dan rempah langsung ke sesama anggota dan pembeli dari luar.',
  },
  {
    icon: <Monitor size={22} className="text-[var(--landing-b2b)]" />,
    title: 'Purchase Order resmi',
    description:
      'Perusahaan bisa buat PO dengan nomor dokumen resmi, negosiasi harga grosir, dan kelola pengiriman skala besar.',
    b2b: true,
  },
  {
    icon: <Users size={22} className="text-[var(--landing-b2b)]" />,
    title: 'Pinjaman korporat',
    description:
      'Anggota korporat dapat mengajukan pinjaman dengan plafon lebih besar dan tenor yang fleksibel.',
    b2b: true,
  },
  {
    icon: <Vote size={22} className="text-[var(--landing-merah)]" />,
    title: 'Musyawarah digital',
    description:
      'Setiap anggota punya satu suara yang sah. Voting online untuk keputusan koperasi yang transparan.',
  },
]

export default function FiturGridSection() {
  return (
    <section id="fitur" className="py-24">
      <div className="landing-section-wrap">
        <SectionEyebrowLanding>Apa yang bisa dilakukan</SectionEyebrowLanding>
        <h2 className="landing-section-title">
          Satu ekosistem,
          <br />
          dua pintu masuk
        </h2>
        <p className="landing-section-sub">
          Semua fitur dirancang agar mudah dipakai — baik oleh petani yang baru kenal smartphone
          maupun staf pengadaan perusahaan.
        </p>

        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--landing-abu-border)] lg:grid-cols-3">
          {fiturList.map(({ icon, title, description, b2b }) => (
            <div
              key={title}
              className="relative border-b border-[var(--landing-abu-border)] p-8 transition-colors last:border-b-0 hover:bg-[var(--landing-abu-bg)] lg:border-b-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-t lg:[&:nth-child(n+4)]:border-t-[var(--landing-abu-border)]"
            >
              {b2b && (
                <span className="absolute right-5 top-5 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--landing-b2b)] bg-[var(--landing-b2b-bg)]">
                  B2B
                </span>
              )}
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] ${
                  b2b ? 'bg-[var(--landing-b2b-bg)]' : 'bg-[var(--landing-merah-muda)]'
                }`}
              >
                {icon}
              </div>
              <h3 className="mb-2.5 text-[17px] font-bold text-[var(--landing-hitam)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--landing-abu-teks)]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
