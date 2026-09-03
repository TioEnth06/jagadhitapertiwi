"use client";

import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { usePinjamanStore } from "@/lib/stores/usePinjamanStore";
import { pinjamanAktif } from "@/lib/data/mockData";
import { BUNGA_FLAT_PERSEN } from "@/lib/hitungPinjaman";
import { formatRupiah } from "@/lib/format";

const statusTag: Record<string, "kuning" | "hijau" | "merah" | "biru" | "abu"> = {
  menunggu: "kuning",
  disetujui: "biru",
  ditolak: "merah",
  cair: "biru",
  lunas: "hijau",
};

export default function PinjamanPage() {
  const pengajuan = usePinjamanStore((s) => s.pengajuan);

  return (
    <div className="pb-4">
      <div className="bg-merah px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Pinjaman Aktif</p>
        <p className="font-mono text-2xl font-bold">{formatRupiah(pinjamanAktif.jumlah)}</p>
        <p className="mt-1 text-xs opacity-70">{pinjamanAktif.noReferensi}</p>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs">
            <span>Cicilan {pinjamanAktif.cicilanKe}/{pinjamanAktif.totalCicilan}</span>
            <span>{pinjamanAktif.progressPersen}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${pinjamanAktif.progressPersen}%` }}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
          <span className="text-sm">Cicilan berikutnya · {pinjamanAktif.jatuhTempoBerikutnya}</span>
          <span className="font-mono text-sm font-bold">
            {formatRupiah(pinjamanAktif.cicilanPerBulan)}
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        <Link href="/pinjaman/ajukan" className="btn btn-merah w-full">
          Ajukan Pinjaman Baru
        </Link>
        <p className="mt-2 text-center text-xs text-abu-teks">
          Bunga flat {BUNGA_FLAT_PERSEN}% per bulan
        </p>
      </div>

      <div className="px-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-abu-teks">Riwayat</h2>
        <div className="space-y-3">
          {pengajuan.map((p) => (
            <div key={p.id} className="kartu p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-sm font-bold">{formatRupiah(p.jumlah)}</p>
                  <p className="text-xs text-abu-teks">{p.tenor} bln · {p.tanggal}</p>
                  <p className="mt-1 text-xs text-abu-teks line-clamp-2">{p.tujuan}</p>
                </div>
                <Tag variant={statusTag[p.status] ?? "abu"}>
                  {p.status === "cair" ? "Berjalan" : p.status === "lunas" ? "Lunas" : p.status}
                </Tag>
              </div>
              <p className="mt-2 text-[11px] text-abu-teks">
                Bunga {BUNGA_FLAT_PERSEN}% · Cicilan {formatRupiah(p.ringkasan.cicilanPerBulan)}/bln
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
