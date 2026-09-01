import { COOP_ABBR, COOP_NAME, COOP_SHORT } from '../constants/brand'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}

const sizes = {
  sm: { circle: 'h-8 w-8 text-[10px]', text: 'text-sm' },
  md: { circle: 'h-10 w-10 text-xs', text: 'text-base' },
  lg: { circle: 'h-16 w-16 text-sm', text: 'text-xl' },
}

export default function Logo({ size = 'md', light = false }: LogoProps) {
  const s = sizes[size]
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex ${s.circle} shrink-0 items-center justify-center rounded-full bg-merah-utama font-bold text-white ${light ? 'bg-white text-merah-utama' : ''}`}
        aria-hidden="true"
      >
        {COOP_ABBR}
      </div>
      <div className={light ? 'text-white' : 'text-teks-utama'}>
        <p className={`${s.text} font-heading font-bold leading-tight`}>{COOP_SHORT}</p>
        {size === 'lg' && (
          <p className={`text-sm font-accent ${light ? 'text-on-merah-muted' : 'text-teks-caption'}`}>
            {COOP_NAME}
          </p>
        )}
      </div>
    </div>
  )
}
