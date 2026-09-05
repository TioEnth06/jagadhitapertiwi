"use client";

import Link from "next/link";
import Tag from "@/components/ui/Tag";
import SectionLabel from "@/components/shared/SectionLabel";
import EmptyState from "@/components/shared/EmptyState";
import { usePinjamanStore } from "@/lib/stores/usePinjamanStore";
import { pinjamanAktif as pinjamanAktifSeed } from "@/lib/data/mockData";
import { BUNGA_FLAT_PERSEN } from "@/lib/hitungPinjaman";
import { pinjamanStatusLabel, statusTagVariant, pinjamanStatusTag } from "@/lib/statusTags";
import { formatRupiah } from "@/lib/format";

export default function PinjamanPage() {
  const pengajuan = usePinjamanStore((s) => s.pengajuan);
  const pinjamanBerjalan = pengajuan.find((p) => p.status === "cair");

  const header = pinjamanBerjalan
    ? {
        jumlah: pinjamanBerjalan.jumlah,
        noReferensi: pinjamanBerjalan.noReferensi,
        cicilanKe: pinjamanAktifSeed.cicilanKe,
        totalCicilan: pinjamanBerjalan.tenor,
        progressPersen: pinjamanAktifSeed.progressPersen,
        jatuhTempoBerikutnya: pinjamanAktifSeed.jatuhTempoBerikutnya,
        cicilanPerBulan: pinjamanBerjalan.ringkasan.cicilanPerBulan,
      }
    : null;

  return (
    <div className="pb-6">
      {header ? (
        <div className="app-hero-merah px-5 pb-6 pt-8 text-white">
          <p className="text-sm opacity-80">Pinjaman Aktif</p>
          <p className="font-mono text-2xl font-bold">{formatRupiah(header.jumlah)}</p>
          <p className="mt-1 font-mono text-xs opacity-70">{header.noReferensi}</p>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs">
              <span>
                Cicilan {header.cicilanKe}/{header.totalCicilan}
              </span>
              <span>{header.progressPersen}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${header.progressPersen}%` }}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">
            <span className="text-sm">Cicilan berikutnya · {header.jatuhTempoBerikutnya}</span>
            <span className="font-mono text-sm font-bold">
              {formatRupiah(header.cicilanPerBulan)}
            </span>
          </div>
        </div>
      ) : (
        <div className="app-hero-merah px-5 pb-6 pt-8 text-white">
          <p className="text-sm opacity-80">Pinjaman</p>
          <p className="font-display text-lg font-bold">Belum ada pinjaman aktif</p>
          <p className="mt-1 text-sm opacity-75">Ajukan pinjaman modal tani mulai Rp 500 ribu.</p>
        </div>
      )}

      <div className="app-content space-y-6">
        <div>
          <Link href="/pinjaman/ajukan" className="btn btn-merah w-full">
            Ajukan Pinjaman Baru
          </Link>
          <p className="mt-2 text-center text-xs text-abu-teks">
            Bunga flat {BUNGA_FLAT_PERSEN}% per bulan
          </p>
        </div>

        <section>
          <SectionLabel title="Riwayat" className="mb-3" />
          {pengajuan.length === 0 ? (
            <EmptyState title="Belum ada pengajuan" description="Ajukan pinjaman untuk melihat riwayat." />
          ) : (
            <div className="space-y-3">
              {pengajuan.map((p) => (
                <div key={p.id} className="app-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-bold">{formatRupiah(p.jumlah)}</p>
                      <p className="text-xs text-abu-teks">
                        {p.tenor} bln · {p.tanggal}
                      </p>
                      <p className="mt-1 text-xs text-abu-teks line-clamp-2">{p.tujuan}</p>
                    </div>
                    <Tag variant={statusTagVariant(pinjamanStatusTag, p.status)} className="shrink-0">
                      {pinjamanStatusLabel[p.status] ?? p.status}
                    </Tag>
                  </div>
                  <p className="mt-2 text-[11px] text-abu-teks">
                    Bunga {BUNGA_FLAT_PERSEN}% · Cicilan {formatRupiah(p.ringkasan.cicilanPerBulan)}/bln
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
