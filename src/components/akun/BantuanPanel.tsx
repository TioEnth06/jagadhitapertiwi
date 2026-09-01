import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { faqItems } from '../../data/mockData'
import PremiumCard from '../ui/PremiumCard'

export default function BantuanPanel() {
  const [openId, setOpenId] = useState<string | null>('1')

  return (
    <>
      <p className="text-base text-abu-teks">
        Pertanyaan yang sering diajukan oleh anggota koperasi.
      </p>
      <div className="space-y-2">
        {faqItems.map((item) => {
          const isOpen = openId === item.id
          return (
            <PremiumCard key={item.id} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-teks-utama">{item.pertanyaan}</span>
                {isOpen ? (
                  <ChevronUp className="shrink-0 text-merah-utama" size={20} />
                ) : (
                  <ChevronDown className="shrink-0 text-abu-teks" size={20} />
                )}
              </button>
              {isOpen && (
                <div className="border-t border-abu-sedang px-4 py-3">
                  <p className="text-base text-teks-utama leading-relaxed">{item.jawaban}</p>
                </div>
              )}
            </PremiumCard>
          )
        })}
      </div>

      <PremiumCard className="p-4 text-center">
        <p className="font-semibold text-teks-utama">Masih butuh bantuan?</p>
        <p className="mt-1 text-sm text-abu-teks">
          Hubungi pengurus melalui menu &ldquo;Hubungi Pengurus&rdquo; atau datang langsung ke kantor koperasi.
        </p>
      </PremiumCard>
    </>
  )
}
