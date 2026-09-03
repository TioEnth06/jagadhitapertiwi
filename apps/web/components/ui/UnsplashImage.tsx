import { useState } from 'react'

interface UnsplashImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  fallbackClassName?: string
}

export default function UnsplashImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackClassName = 'bg-merah-muda',
}: UnsplashImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${fallbackClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl opacity-60" aria-hidden="true">
          🌾
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => setError(true)}
    />
  )
}
