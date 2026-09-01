import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface TombolSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'outline-merah' | 'outline-abu'
  fullWidth?: boolean
  pill?: boolean
}

export default function TombolSecondary({
  children,
  variant = 'outline-merah',
  fullWidth = false,
  pill = false,
  className = '',
  ...props
}: TombolSecondaryProps) {
  const variantClass =
    variant === 'outline-merah'
      ? 'border-2 border-merah-utama text-merah-utama hover:bg-merah-muda'
      : 'border-2 border-abu-sedang text-abu-teks hover:bg-abu-terang'

  const radius = pill ? 'rounded-full' : 'rounded-[10px]'

  return (
    <button
      type="button"
      className={`inline-flex min-h-[52px] items-center justify-center ${radius} bg-white px-6 py-3.5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
