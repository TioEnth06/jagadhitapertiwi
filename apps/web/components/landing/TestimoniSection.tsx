import { testimoniLanding } from '@/lib/data/mockData'
import SectionEyebrowLanding from './SectionEyebrowLanding'

export default function TestimoniSection() {
  return (
    <section id="testimoni" className="bg-[var(--landing-abu-bg)] py-24">
      <div className="landing-section-wrap">
        <SectionEyebrowLanding>Kata mereka</SectionEyebrowLanding>
        <h2 className="landing-section-title">Dari petani hingga perusahaan</h2>
        <p className="landing-section-sub">
          Anggota individu dan mitra korporat berbagi pengalaman bergabung dengan Koperasi JDP.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimoniLanding.map(({ id, nama, peran, kutipan, inisial, warna, tipe }) => (
            <div
              key={id}
              className="rounded-[14px] border border-[var(--landing-abu-border)] bg-white p-7"
            >
              <div className="mb-3.5 tracking-[2px] text-[#F59E0B] text-[13px]" aria-label="5 bintang">
                ★★★★★
              </div>
              <p className="mb-5 text-[15px] italic leading-relaxed text-[var(--landing-teks)]">
                &ldquo;{kutipan}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                  style={{ background: warna }}
                >
                  {inisial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-[var(--landing-hitam)]">{nama}</div>
                  <div className="text-xs text-[var(--landing-abu-teks)]">{peran}</div>
                </div>
                <span
                  className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    tipe === 'korporat'
                      ? 'bg-[var(--landing-b2b-bg)] text-[var(--landing-b2b)]'
                      : 'bg-[var(--landing-merah-muda)] text-[var(--landing-merah)]'
                  }`}
                >
                  {tipe === 'korporat' ? 'Korporat' : 'Individu'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
