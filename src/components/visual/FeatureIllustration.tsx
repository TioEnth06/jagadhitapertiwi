import { Wallet, ShoppingCart, Vote, Sprout, FileText, Bell } from 'lucide-react'
import { UNSPLASH } from '../../constants/images'
import UnsplashImage from '../ui/UnsplashImage'

type FeatureType = 'simpanan' | 'pasar' | 'suara' | 'kartu' | 'dokumen' | 'notifikasi'

const config: Record<
  FeatureType,
  { image: string; icon: typeof Wallet; accent: string }
> = {
  simpanan: {
    image: UNSPLASH.fitur.simpanan,
    icon: Wallet,
    accent: 'text-merah-utama',
  },
  pasar: {
    image: UNSPLASH.fitur.pasar,
    icon: ShoppingCart,
    accent: 'text-hijau-sukses',
  },
  suara: {
    image: UNSPLASH.fitur.suara,
    icon: Vote,
    accent: 'text-kuning-warning',
  },
  kartu: {
    image: UNSPLASH.fitur.kartu,
    icon: Sprout,
    accent: 'text-merah-utama',
  },
  dokumen: {
    image: UNSPLASH.fitur.kartu,
    icon: FileText,
    accent: 'text-merah-utama',
  },
  notifikasi: {
    image: UNSPLASH.fitur.simpanan,
    icon: Bell,
    accent: 'text-merah-utama',
  },
}

interface FeatureIllustrationProps {
  type: FeatureType
  size?: 'sm' | 'lg'
}

export default function FeatureIllustration({ type, size = 'lg' }: FeatureIllustrationProps) {
  const { image, icon: Icon, accent } = config[type]
  const boxSize = size === 'lg' ? 'min-h-[220px]' : 'min-h-[120px]'
  const iconSize = size === 'lg' ? 48 : 32
  const ringSize = size === 'lg' ? 'h-24 w-24' : 'h-16 w-16'

  return (
    <div className={`relative overflow-hidden rounded-2xl ${boxSize}`}>
      <UnsplashImage
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-merah-gelap/50 via-merah-utama/30 to-transparent" />
      <div className="relative flex h-full min-h-[inherit] items-center justify-center p-6">
        <div
          className={`flex ${ringSize} items-center justify-center rounded-full bg-white/95 shadow-lg ring-4 ring-white/60 backdrop-blur-sm`}
        >
          <Icon className={accent} size={iconSize} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
