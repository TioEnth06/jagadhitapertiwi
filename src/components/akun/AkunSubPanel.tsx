import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface AkunSubPanelProps {
  title: string
  onBack: () => void
  children: ReactNode
}

export default function AkunSubPanel({ title, onBack, children }: AkunSubPanelProps) {
  return (
    <div className="space-y-5 pb-4">
      <header className="flex items-center gap-3 px-4 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white shadow-sm"
          aria-label="Kembali ke menu akun"
        >
          <ArrowLeft size={22} className="text-teks-utama" />
        </button>
        <h1 className="text-xl font-bold text-teks-utama">{title}</h1>
      </header>
      <div className="space-y-4 px-4">{children}</div>
    </div>
  )
}
