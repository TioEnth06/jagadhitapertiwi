"use client";

import { Suspense } from "react";
import Link from "next/link";
import { FileText, Phone, HelpCircle } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import Tag from "@/components/ui/Tag";
import MenuList from "@/components/shared/MenuList";
import KontakPengurusCard from "@/components/shared/account/KontakPengurusCard";
import FaqAccordionList from "@/components/shared/account/FaqAccordionList";
import B2BPageHeader, { B2BStatCard, B2BStatGrid } from "@/components/b2b/B2BPageHeader";
import { useSubView } from "@/lib/hooks/useSubView";
import { useB2BStore } from "@/lib/stores/useB2BStore";
import { kontakPengurus, faqItems } from "@/lib/data/mockData";
import { formatRupiah } from "@/lib/format";

const AKUN_VIEWS = ["dokumen", "hubungi", "bantuan"] as const;
type AkunView = (typeof AKUN_VIEWS)[number];

const menuItems = [
  {
    id: "dokumen" as const,
    label: "Dokumen Perusahaan",
    description: "NPWP, akta, dan sertifikat",
    Icon: FileText,
  },
  {
    id: "hubungi" as const,
    label: "Account Manager",
    description: "Hubungi tim B2B koperasi",
    Icon: Phone,
  },
  {
    id: "bantuan" as const,
    label: "Bantuan B2B",
    description: "FAQ dan panduan korporat",
    Icon: HelpCircle,
  },
];

const viewTitles: Record<AkunView, string> = {
  dokumen: "Dokumen Perusahaan",
  hubungi: "Account Manager",
  bantuan: "Bantuan B2B",
};

const dokumenKorporat = [
  { nama: "NPWP PT Nusapangan Sejahtera", status: "Terverifikasi" },
  { nama: "Akta Pendirian & Perubahan", status: "Terverifikasi" },
  { nama: "NIB / OSS", status: "Terverifikasi" },
  { nama: "Sertifikat Keanggotaan Korporat", status: "Terverifikasi" },
];

function B2BAkunContent() {
  const { view, openView, backToMenu } = useSubView("/b2b/akun", AKUN_VIEWS);
  const profile = useB2BStore((s) => s.profile);
  const purchaseOrders = useB2BStore((s) => s.purchaseOrders);

  if (view) {
    return (
      <div className="pb-6">
        <TopBar title={viewTitles[view]} variant="b2b" onBack={backToMenu} />
        <div className="b2b-content space-y-3">
          {view === "dokumen" &&
            dokumenKorporat.map((d) => (
              <div key={d.nama} className="b2b-card flex items-center justify-between gap-3 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="b2b-icon-box h-10 w-10">
                    <FileText size={18} />
                  </div>
                  <p className="text-sm font-semibold leading-snug">{d.nama}</p>
                </div>
                <Tag variant="hijau" className="shrink-0">
                  {d.status}
                </Tag>
              </div>
            ))}
          {view === "hubungi" && (
            <KontakPengurusCard
              kontak={kontakPengurus}
              variant="b2b"
              subtitle={`Account Manager B2B · ${kontakPengurus.jabatan}`}
            />
          )}
          {view === "bantuan" && (
            <FaqAccordionList items={faqItems.slice(0, 3)} variant="b2b" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <B2BPageHeader
        eyebrow="Akun Korporat"
        title={profile.nama}
        meta={profile.noAnggota}
        badge={profile.tier}
      >
        <B2BStatGrid>
          <B2BStatCard label="Total PO" value={purchaseOrders.length} large />
          <B2BStatCard label="Limit Pinjaman" value={formatRupiah(profile.limitPinjaman)} />
        </B2BStatGrid>
      </B2BPageHeader>

      <div className="b2b-content space-y-4">
        <MenuList
          variant="b2b"
          items={menuItems.map((item) => ({
            ...item,
            onClick: () => openView(item.id),
          }))}
        />

        <Link href="/b2b" className="b2b-outline-btn">
          Kembali ke Dashboard B2B
        </Link>
      </div>
    </div>
  );
}

function B2BAkunFallback() {
  return (
    <div className="pb-6">
      <div className="b2b-hero animate-pulse px-5 pb-6 pt-8">
        <div className="h-4 w-24 rounded bg-white/30" />
        <div className="mt-3 h-7 w-48 rounded bg-white/30" />
      </div>
    </div>
  );
}

export default function B2BAkunPage() {
  return (
    <Suspense fallback={<B2BAkunFallback />}>
      <B2BAkunContent />
    </Suspense>
  );
}
