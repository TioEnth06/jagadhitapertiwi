import { UNSPLASH } from '../../constants/images'
import UnsplashImage from '../ui/UnsplashImage'

export default function HeroIllustration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <UnsplashImage
        src={UNSPLASH.hero}
        alt=""
        loading="eager"
        className="h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-merah-gelap/92 via-merah-utama/78 to-merah-gelap/95" />

      <div className="absolute -right-16 top-20 h-64 w-64 rounded-full bg-white/5 blur-sm" />
      <div className="absolute -left-10 bottom-32 h-48 w-48 rounded-full bg-white/5" />
      <div className="absolute right-1/4 top-1/3 h-24 w-24 rounded-full border border-white/10" />
    </div>
  )
}
