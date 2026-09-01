interface StepIndicatorProps {
  steps: string[]
  current: number
}

export default function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between gap-1">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const active = stepNum <= current
        return (
          <div key={label} className="flex min-w-0 flex-1 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                active ? 'bg-merah-utama text-white shadow-sm' : 'bg-abu-sedang text-abu-teks'
              }`}
            >
              {stepNum}
            </div>
            <p
              className={`mt-1 max-w-full truncate text-[10px] font-semibold ${
                active ? 'text-merah-utama' : 'text-abu-teks'
              }`}
            >
              {label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
