import Tag from "@/components/ui/Tag";
import { formatRupiah } from "@/lib/format";
import { poStatusTag, statusTagVariant } from "@/lib/statusTags";
import type { PurchaseOrder } from "@/lib/types";

interface B2BPOCardProps {
  po: PurchaseOrder;
  showMeta?: boolean;
}

export default function B2BPOCard({ po, showMeta = true }: B2BPOCardProps) {
  return (
    <div className="b2b-card b2b-card-interactive p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs text-[var(--landing-abu-teks)]">{po.ref}</p>
          <p className="font-display mt-0.5 text-[15px] font-bold leading-snug text-[var(--landing-hitam)]">
            {po.produk}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--landing-abu-teks)]">
            {po.volume} {po.satuan}
            {showMeta && po.penjual ? ` · ${po.penjual}` : ""}
            {!showMeta && po.tanggal ? ` · ${po.tanggal}` : ""}
          </p>
        </div>
        <Tag variant={statusTagVariant(poStatusTag, po.status)} className="shrink-0">
          {po.status}
        </Tag>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2 border-t border-[var(--landing-abu-border)] pt-3">
        <p className="b2b-accent font-mono text-sm font-bold">{formatRupiah(po.total)}</p>
        {showMeta && (
          <p className="text-right text-[11px] leading-snug text-[var(--landing-abu-teks)]">
            {po.tanggal}
            <br />
            {po.lokasi}
          </p>
        )}
      </div>
    </div>
  );
}
