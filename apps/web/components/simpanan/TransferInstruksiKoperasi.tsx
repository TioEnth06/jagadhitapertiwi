import { formatRupiah } from "@/lib/format";
import type { MetodeTransferOption } from "@/lib/types";

interface TransferInstruksiProps {
  metode: MetodeTransferOption;
  nominal: number;
  referensi?: string;
}

export default function TransferInstruksiKoperasi({
  metode,
  nominal,
  referensi,
}: TransferInstruksiProps) {
  return (
    <div className="kartu space-y-3 bg-abu-bg p-4">
      <p className="text-sm font-bold">Instruksi Pembayaran — {metode.label}</p>
      <p className="text-xs text-abu-teks">{metode.deskripsi}</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <span className="text-abu-teks">Bank / Channel</span>
          <span className="text-right font-semibold">{metode.bank}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-abu-teks">No. Rekening / VA</span>
          <span className="font-mono text-right font-semibold">{metode.nomor}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-abu-teks">Atas Nama</span>
          <span className="max-w-[55%] text-right text-xs font-semibold leading-snug">
            {metode.atasNama}
          </span>
        </div>
        {metode.kodeVirtual && (
          <div className="flex justify-between gap-2">
            <span className="text-abu-teks">Kode Virtual</span>
            <span className="font-mono text-right text-xs font-semibold">{metode.kodeVirtual}</span>
          </div>
        )}
        <div className="flex justify-between gap-2 border-t border-abu-border pt-2">
          <span className="text-abu-teks">Nominal</span>
          <span className="font-mono font-bold text-merah">{formatRupiah(nominal)}</span>
        </div>
        {referensi && (
          <div className="flex justify-between gap-2">
            <span className="text-abu-teks">Referensi</span>
            <span className="font-mono text-right text-xs font-semibold">{referensi}</span>
          </div>
        )}
      </div>
      <p className="text-xs leading-relaxed text-abu-teks">
        Cantumkan nomor referensi di berita transfer. Verifikasi pengurus 1×24 jam kerja.
      </p>
    </div>
  );
}
