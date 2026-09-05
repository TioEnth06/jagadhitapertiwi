"use client";

import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import DemoToast from "@/components/ui/DemoToast";
import EmptyState from "@/components/shared/EmptyState";
import { useAdminStore } from "@/lib/stores/useAdminStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";

export default function AdminAnggotaPage() {
  const pendingAnggota = useAdminStore((s) => s.pendingAnggota);
  const setujuiAnggota = useAdminStore((s) => s.setujuiAnggota);
  const tolakAnggota = useAdminStore((s) => s.tolakAnggota);
  const { message, showToast, dismiss } = useDemoToast();

  return (
    <div className="pb-6">
      <TopBar title="Approval Anggota" backHref="/admin" />

      <div className="app-content space-y-4">
        {pendingAnggota.length === 0 ? (
          <EmptyState title="Tidak ada pendaftaran pending" />
        ) : (
          pendingAnggota.map((a) => (
            <div key={a.id} className="app-card p-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-white"
                  style={{ backgroundColor: a.warna }}
                >
                  {a.inisial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold">{a.nama}</p>
                    <Tag variant={a.tipe === "korporat" ? "biru" : "hijau"}>{a.tipe}</Tag>
                  </div>
                  {a.nik && <p className="text-xs text-abu-teks">NIK: {a.nik}</p>}
                  <p className="text-xs text-abu-teks">{a.noHp}</p>
                  <p className="text-xs text-abu-teks">{a.alamat}</p>
                  <p className="mt-1 text-xs text-abu-teks">Daftar: {a.tanggalDaftar}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {a.dokumen.map((d) => (
                      <Tag key={d} variant="abu">
                        {d}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Btn
                  variant="hijau"
                  onClick={() => {
                    setujuiAnggota(a.id);
                    showToast(`${a.nama} disetujui sebagai anggota.`);
                  }}
                >
                  Setujui
                </Btn>
                <Btn
                  variant="outline"
                  onClick={() => {
                    tolakAnggota(a.id);
                    showToast(`${a.nama} ditolak.`);
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
