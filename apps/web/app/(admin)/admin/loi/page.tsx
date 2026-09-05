"use client";

import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import DemoToast from "@/components/ui/DemoToast";
import { useAdminStore } from "@/lib/stores/useAdminStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { loiStatusTag } from "@/lib/statusTags";

export default function AdminLoiPage() {
  const loiInbox = useAdminStore((s) => s.loiInbox);
  const updateLoiStatus = useAdminStore((s) => s.updateLoiStatus);
  const { message, showToast, dismiss } = useDemoToast();

  return (
    <div className="pb-6">
      <TopBar title="Inbox LOI" backHref="/admin" />

      <div className="app-content space-y-4">
        {loiInbox.map((loi) => (
          <div key={loi.id} className="app-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-mono text-xs text-abu-teks">{loi.ref}</p>
                <p className="font-bold">{loi.perusahaan}</p>
                <p className="text-sm text-abu-teks">
                  {loi.kontak} · {loi.telepon}
                </p>
              </div>
              <Tag variant={loiStatusTag[loi.status]} className="shrink-0">
                {loi.status}
              </Tag>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <span className="text-abu-teks">Produk:</span> {loi.produk}
              </p>
              <p>
                <span className="text-abu-teks">Volume:</span> {loi.volume}
              </p>
              <p>
                <span className="text-abu-teks">Lokasi:</span> {loi.lokasi}
              </p>
              <p>
                <span className="text-abu-teks">Butuh:</span> {loi.tanggalButuh}
              </p>
              {loi.catatan && <p className="italic text-abu-teks">{loi.catatan}</p>}
            </div>
            <p className="mt-2 text-xs text-abu-teks">
              {loi.tanggal} · sumber: {loi.sumber}
            </p>
            {loi.status !== "selesai" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Btn
                  variant="wa"
                  className="!min-h-[44px] flex-1 !w-auto"
                  onClick={() => {
                    updateLoiStatus(loi.id, "dihubungi");
                    showToast(`Menghubungi ${loi.kontak} via WA...`);
                  }}
                >
                  Hubungi WA
                </Btn>
                <Btn
                  variant="biru"
                  className="!min-h-[44px] flex-1 !w-auto"
                  onClick={() => {
                    updateLoiStatus(loi.id, "assigned");
                    showToast(`LOI ${loi.ref} di-assign ke penjual.`);
                  }}
                >
                  Assign
                </Btn>
                <Btn
                  variant="hijau"
                  className="!min-h-[44px] flex-1 !w-auto"
                  onClick={() => {
                    updateLoiStatus(loi.id, "selesai");
                    showToast(`LOI ${loi.ref} selesai.`);
                  }}
                >
                  Selesai
                </Btn>
              </div>
            )}
          </div>
        ))}
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
