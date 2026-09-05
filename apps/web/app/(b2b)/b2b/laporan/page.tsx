"use client";

import B2BPageHeader, { B2BStatCard, B2BStatGrid } from "@/components/b2b/B2BPageHeader";
import B2BSection from "@/components/b2b/B2BSection";
import B2BPOCard from "@/components/b2b/B2BPOCard";
import { useB2BStore } from "@/lib/stores/useB2BStore";
import { formatRupiah } from "@/lib/format";

export default function B2BLaporanPage() {
  const purchaseOrders = useB2BStore((s) => s.purchaseOrders);

  const selesai = purchaseOrders.filter((o) => o.status === "selesai");
  const totalNilai = purchaseOrders.reduce((sum, o) => sum + o.total, 0);
  const totalFee = purchaseOrders.reduce(
    (sum, o) => sum + Math.round(o.total * (o.feePersen / 100)),
    0,
  );

  return (
    <div className="pb-6">
      <B2BPageHeader
        backHref="/b2b"
        eyebrow="Laporan Korporat"
        title="Ringkasan Transaksi"
        subtitle="Pantau nilai PO dan fee koperasi"
      >
        <B2BStatGrid>
          <B2BStatCard label="Total PO" value={purchaseOrders.length} large />
          <B2BStatCard label="Selesai" value={selesai.length} large />
          <div className="col-span-2">
            <B2BStatCard label="Nilai Kumulatif" value={formatRupiah(totalNilai)} />
          </div>
        </B2BStatGrid>
      </B2BPageHeader>

      <div className="b2b-content space-y-6">
        <div className="b2b-summary p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--landing-abu-teks)]">
            Fee koperasi (1.5%)
          </p>
          <p className="b2b-accent mt-1 font-mono text-xl font-bold">
            {formatRupiah(totalFee)}
          </p>
        </div>

        <B2BSection title="Riwayat PO">
          {purchaseOrders.length === 0 ? (
            <div className="b2b-empty">
              <p className="text-sm text-[var(--landing-abu-teks)]">Belum ada riwayat PO.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {purchaseOrders.map((po) => (
                <B2BPOCard key={po.id} po={po} showMeta={false} />
              ))}
            </div>
          )}
        </B2BSection>
      </div>
    </div>
  );
}
