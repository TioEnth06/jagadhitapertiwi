interface KemenkopBadgeProps {
  size?: 'sm' | 'md'
}

export default function KemenkopBadge({ size = 'md' }: KemenkopBadgeProps) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-14 w-14'
  const svg = size === 'sm' ? 'h-6 w-6' : 'h-10 w-10'

  return (
    <div
      className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-merah-muda ring-2 ring-merah-utama/20`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className={svg}>
        <circle cx="24" cy="24" r="22" fill="#CC0000" />
        <text
          x="24"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          KEMEN
        </text>
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          KOP RI
        </text>
        <circle cx="24" cy="38" r="3" fill="#FFF0F0" />
      </svg>
    </div>
  )
}

export function TrustLogoStrip() {
  const logos = [
    { abbr: 'JDP', name: 'Koperasi JDP' },
    { abbr: '🌾', name: 'Petani Nusantara' },
    { abbr: 'RI', name: 'Kemenkop RI' },
  ]

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-70">
      {logos.map(({ abbr, name }) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-abu-terang text-lg font-bold text-abu-teks">
            {abbr}
          </div>
          <span className="text-xs text-abu-teks">{name}</span>
        </div>
      ))}
    </div>
  )
}
