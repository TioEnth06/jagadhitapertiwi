interface DemoToastProps {
  message: string | null
  onDismiss: () => void
}

export default function DemoToast({ message, onDismiss }: DemoToastProps) {
  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-above-nav fixed left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-[calc(var(--app-max-width)-1.5rem)] -translate-x-1/2"
    >
      <div className="flex items-start gap-3 rounded-2xl border border-abu-sedang bg-white px-4 py-3 shadow-xl">
        <span className="text-lg" aria-hidden="true">
          ✓
        </span>
        <p className="flex-1 text-sm font-medium text-teks-utama">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-abu-teks hover:text-teks-utama"
          aria-label="Tutup notifikasi"
        >
          ×
        </button>
      </div>
    </div>
  )
}
