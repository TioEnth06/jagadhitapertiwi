"use client";

import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import DemoToast from "@/components/ui/DemoToast";
import EmptyState from "@/components/shared/EmptyState";
import { usePinjamanStore } from "@/lib/stores/usePinjamanStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { BUNGA_FLAT_PERSEN } from "@/lib/hitungPinjaman";
import { formatRupiah } from "@/lib/format";

export default function AdminPinjamanPage() {
  const pengajuan = usePinjamanStore((s) => s.pengajuan);
  const updateStatus = usePinjamanStore((s) => s.updateStatus);
  const { message, showToast, dismiss } = useDemoToast();
  const pending = pengajuan.filter((p) => p.status === "menunggu");

  return (
    <div className="pb-6">
      <TopBar title="Approval Pinjaman" backHref="/admin" />

      <div className="app-content space-y-4">
        {pending.length === 0 ? (
          <EmptyState title="Tidak ada pengajuan pending" />
        ) : (
          pending.map((p) => (
            <div key={p.id} className="app-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-abu-teks">{p.noReferensi}</p>
                  <p className="font-mono text-lg font-bold">{formatRupiah(p.jumlah)}</p>
                  <p className="text-xs text-abu-teks">
                    {p.tenor} bln · Bunga {BUNGA_FLAT_PERSEN}% · {p.tanggal}
                  </p>
                </div>
                <Tag variant="kuning" className="shrink-0">
                  menunggu
                </Tag>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{p.tujuan}</p>
              <p className="mt-1 text-xs text-abu-teks">
                Cicilan {formatRupiah(p.ringkasan.cicilanPerBulan)}/bln
              </p>
              <div className="mt-4 flex gap-2">
                <Btn
                  variant="hijau"
                  onClick={() => {
                    updateStatus(p.id, "cair", "Disetujui pengurus — pencairan 1-3 hari kerja.");
                    showToast(`${p.noReferensi} disetujui & dicairkan.`);
                  }}
                >
                  Setujui & Cairkan
                </Btn>
                <Btn
                  variant="outline"
                  onClick={() => {
                    updateStatus(p.id, "ditolak", "Pengajuan ditolak — plafon tidak mencukupi.");
                    showToast(`${p.noReferensi} ditolak.`);
                  }}
                >
                  Tolak
                </Btn>
              </div>
            </div>
          ))
        )}
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
