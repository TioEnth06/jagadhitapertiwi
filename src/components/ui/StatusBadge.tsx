import type { StatusOrder, StatusPinjaman, StatusTransaksi } from '../../types'

type StatusKind = StatusPinjaman | StatusOrder | StatusTransaksi

const config: Record<StatusKind, { label: string; className: string }> = {
  menunggu: {
    label: 'Menunggu',
    className: 'bg-kuning-warning/15 text-kuning-warning',
  },
  disetujui: {
    label: 'Disetujui',
    className: 'bg-hijau-sukses/10 text-hijau-sukses',
  },
  ditolak: {
    label: 'Ditolak',
    className: 'bg-merah-muda text-merah-utama',
  },
  cair: {
    label: 'Cair',
    className: 'bg-merah-muda text-merah-utama',
  },
  lunas: {
    label: 'Lunas',
    className: 'bg-hijau-sukses/10 text-hijau-sukses',
  },
  diproses: {
    label: 'Diproses',
    className: 'bg-merah-muda text-merah-utama',
  },
  selesai: {
    label: 'Selesai',
    className: 'bg-hijau-sukses/10 text-hijau-sukses',
  },
  dibatalkan: {
    label: 'Dibatalkan',
    className: 'bg-abu-terang text-teks-caption',
  },
}

interface StatusBadgeProps {
  status: StatusKind
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status]
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${className}`}>
      {label}
    </span>
  )
}
