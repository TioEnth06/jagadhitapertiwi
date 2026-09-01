import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export default function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Tutup"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        className="sheet-panel relative z-10 w-full max-w-[var(--app-max-width)] rounded-t-3xl bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-abu-sedang bg-white px-4 py-3">
          <h2 id="bottom-sheet-title" className="text-base font-heading font-bold text-teks-utama">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-teks-caption hover:bg-abu-terang"
            aria-label="Tutup panel"
          >
            <X size={20} />
          </button>
        </div>
        <div className="sheet-panel-body p-4">{children}</div>
      </div>
    </div>
  )
}
