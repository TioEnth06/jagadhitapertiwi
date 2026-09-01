import { Link, useLocation } from 'react-router-dom'
import { Home, Wallet, Banknote, ShoppingCart, User } from 'lucide-react'
import type { TabNav } from '../types'

const tabs: { id: TabNav; label: string; shortLabel: string; path: string; icon: typeof Home }[] = [
  { id: 'beranda', label: 'Beranda', shortLabel: 'Beranda', path: '/beranda', icon: Home },
  { id: 'simpanan', label: 'Simpanan', shortLabel: 'Simpan', path: '/simpanan', icon: Wallet },
  { id: 'pinjaman', label: 'Pinjaman', shortLabel: 'Pinjam', path: '/pinjaman', icon: Banknote },
  { id: 'pasar', label: 'Pasar', shortLabel: 'Pasar', path: '/pasar', icon: ShoppingCart },
  { id: 'akun', label: 'Akun', shortLabel: 'Akun', path: '/akun', icon: User },
]

interface NavBawahProps {
  activeTab?: TabNav
}

export default function NavBawah({ activeTab }: NavBawahProps) {
  const location = useLocation()

  return (
    <nav
      className="nav-floating fixed left-1/2 z-50 flex h-[var(--nav-height)] w-[calc(100%-1.25rem)] max-w-[calc(var(--app-max-width)-1.25rem)] -translate-x-1/2 items-center justify-between rounded-full border border-abu-sedang/50 bg-white/95 px-1 shadow-lg backdrop-blur-md"
      aria-label="Navigasi utama"
    >
      {tabs.map(({ id, label, shortLabel, path, icon: Icon }) => {
        const isActive = activeTab ? activeTab === id : location.pathname === path
        return (
          <Link
            key={id}
            to={path}
            aria-label={label}
            className={`flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center rounded-full px-0.5 py-1 text-[10px] font-semibold leading-tight transition-all ${
              isActive
                ? 'bg-merah-muda text-merah-utama'
                : 'text-teks-caption hover:text-merah-utama'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
            <span className="mt-0.5 max-w-full truncate">{shortLabel}</span>
          </Link>
        )
      })}
    </nav>
  )
}
