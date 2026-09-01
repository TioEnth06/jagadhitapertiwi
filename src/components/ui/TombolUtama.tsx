import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface TombolUtamaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  variant?: 'default' | 'pill'
}

export default function TombolUtama({
  children,
  fullWidth = false,
  variant = 'default',
  className = '',
  ...props
}: TombolUtamaProps) {
  const radius = variant === 'pill' ? 'rounded-full' : 'rounded-[10px]'

  return (
    <button
      type="button"
      className={`inline-flex min-h-[52px] items-center justify-center ${radius} bg-merah-utama px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-merah-gelap hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
