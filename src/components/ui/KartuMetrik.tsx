interface KartuMetrikProps {
  label: string
  nilai: string
  satuan?: string
  variant?: 'default' | 'merah' | 'putih'
}

export default function KartuMetrik({
  label,
  nilai,
  satuan,
  variant = 'default',
}: KartuMetrikProps) {
  const bgClass =
    variant === 'merah'
      ? 'bg-merah-gelap text-white'
      : variant === 'putih'
        ? 'bg-white border border-abu-sedang'
        : 'bg-white border border-abu-sedang'

  const labelClass =
    variant === 'merah' ? 'text-on-merah-muted' : 'text-abu-teks'

  const nilaiClass =
    variant === 'merah' ? 'text-white' : 'text-teks-utama'

  return (
    <div className={`rounded-[14px] p-5 ${bgClass}`}>
      <p className={`text-sm font-semibold ${labelClass}`}>{label}</p>
      <p className={`balance-amount mt-1 ${nilaiClass}`}>
        {nilai}
        {satuan && <span className="ml-1 text-lg font-sans font-semibold">{satuan}</span>}
      </p>
    </div>
  )
}
