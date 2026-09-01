interface StatDisplayProps {
  value: string
  label: string
  light?: boolean
  compact?: boolean
}

export default function StatDisplay({
  value,
  label,
  light = false,
  compact = false,
}: StatDisplayProps) {
  return (
    <div className="text-center sm:text-left">
      <p
        className={`font-mono-angka font-bold leading-tight ${
          compact ? 'text-2xl' : 'stat-number'
        } ${light ? 'text-white' : 'text-teks-utama'}`}
      >
        {value}
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          light ? 'text-on-merah-muted' : 'text-abu-teks'
        }`}
      >
        {label}
      </p>
    </div>
  )
}
