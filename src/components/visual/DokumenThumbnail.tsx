interface DokumenThumbnailProps {
  jenis: string
}

export default function DokumenThumbnail({ jenis }: DokumenThumbnailProps) {
  const isKtp = jenis === 'Identitas'
  const isSertifikat = jenis === 'Keanggotaan'

  return (
    <div
      className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md border border-abu-sedang shadow-sm"
      aria-hidden="true"
    >
      {isKtp ? (
        <div className="h-full bg-gradient-to-b from-sky-100 to-sky-200 p-1">
          <div className="h-3 w-full rounded-sm bg-sky-300/50" />
          <div className="mt-1 h-6 w-6 rounded-full bg-sky-400/40 mx-auto" />
          <div className="mt-1 space-y-0.5 px-0.5">
            <div className="h-0.5 w-full rounded bg-sky-400/30" />
            <div className="h-0.5 w-3/4 rounded bg-sky-400/30" />
          </div>
        </div>
      ) : isSertifikat ? (
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-merah-muda to-white p-1">
          <span className="text-[8px] font-bold text-merah-utama">JDP</span>
          <div className="mt-0.5 h-px w-full bg-merah-utama/30" />
          <span className="mt-0.5 text-[6px] text-abu-teks text-center leading-tight">
            Sertifikat
          </span>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center bg-abu-terang text-lg">
          📄
        </div>
      )}
    </div>
  )
}
