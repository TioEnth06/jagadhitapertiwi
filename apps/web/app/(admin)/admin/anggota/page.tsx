"use client";

import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import DemoToast from "@/components/ui/DemoToast";
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

      <div className="space-y-4 px-5 py-4">
        {pendingAnggota.length === 0 ? (
          <p className="text-center text-sm text-abu-teks">Tidak ada pendaftaran pending.</p>
        ) : (
          pendingAnggota.map((a) => (
            <div key={a.id} className="kartu p-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: a.warna }}
                >
                  {a.inisial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
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
