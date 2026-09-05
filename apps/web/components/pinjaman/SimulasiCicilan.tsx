"use client";
import { useMemo } from "react";
import { formatRupiah } from "@/lib/format";
import { BUNGA_FLAT_PERSEN, hitungPinjaman } from "@/lib/hitungPinjaman";

type Props = {
  jumlah: number;
  tenor: number;
};

export default function SimulasiCicilan({ jumlah, tenor }: Props) {
  const hasil = useMemo(() => hitungPinjaman(jumlah, tenor), [jumlah, tenor]);

  const baris = [
    { label: "Jumlah pinjaman", nilai: formatRupiah(jumlah), bold: false },
    { label: "Bunga", nilai: `${BUNGA_FLAT_PERSEN}% / bulan (flat)`, bold: false },
    { label: "Total bunga", nilai: formatRupiah(hasil.totalBunga), bold: false },
    { label: "Cicilan per bulan", nilai: formatRupiah(hasil.cicilanPerBulan), bold: true },
    { label: "Total bayar", nilai: formatRupiah(hasil.totalBayar), bold: true },
  ];

  return (
    <div className="kartu bg-abu-bg border-abu-border">
      <p className="text-xs font-bold text-abu-teks uppercase tracking-wider mb-3">
        Simulasi cicilan
      </p>
      <div className="space-y-2">
        {baris.map(({ label, nilai, bold }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-abu-teks">{label}</span>
            <span className={`font-mono text-sm ${bold ? "font-bold text-merah" : "text-hitam"}`}>
              {nilai}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-abu-teks mt-3 pt-3 border-t border-abu-border">
        Suku bunga mengikuti keputusan rapat anggota. Proses 1–3 hari kerja.
      </p>
    </div>
  );
}
