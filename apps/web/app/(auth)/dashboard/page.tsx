"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Wallet, CreditCard, ShoppingBasket, TrendingUp, Bell } from "lucide-react";
import PengumumanBanner from "@/components/beranda/PengumumanBanner";
import SectionHead from "@/components/ui/SectionHead";
import Tag from "@/components/ui/Tag";
import SectionLabel from "@/components/shared/SectionLabel";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useSimpananStore } from "@/lib/stores/useSimpananStore";
import { daftarPengumuman, produkUnggulan } from "@/lib/data/mockData";
import { formatRupiah } from "@/lib/format";

const aksiCepat = [
  { label: "Setor Simpanan", href: "/simpanan", Icon: Wallet },
  { label: "Ajukan Pinjaman", href: "/pinjaman/ajukan", Icon: CreditCard },
  { label: "Belanja Produk", href: "/marketplace", Icon: ShoppingBasket },
  { label: "Suara Anggota", href: "/voting", Icon: TrendingUp },
];

export default function DashboardPage() {
  const anggota = useAuthStore((s) => s.anggota);
  const simpanan = useSimpananStore((s) => s.simpanan);

  const nama = useMemo(() => anggota?.nama?.split(" ")[0] ?? "Anggota", [anggota]);

  return (
    <div className="pb-6">
      <div className="app-hero-merah px-5 pb-6 pt-8 text-white">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-sm opacity-80">Selamat pagi,</p>
            <p className="font-display text-xl font-bold">{nama} 👋</p>
            <p className="mt-1 font-mono text-xs opacity-70">{anggota?.noAnggota}</p>
          </div>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20"
            aria-label="Notifikasi"
          >
            <Bell size={18} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-yellow-400" />
          </button>
        </div>

        <div className="rounded-2xl bg-white/15 p-4">
          <p className="mb-1 text-xs opacity-75">Total Simpanan Anda</p>
          <p className="font-mono text-3xl font-bold leading-none">{formatRupiah(simpanan.total)}</p>
          <div className="mt-3 flex gap-4 border-t border-white/20 pt-3">
            <div>
              <p className="text-[10px] opacity-65">Pokok</p>
              <p className="font-mono text-sm font-medium">{formatRupiah(simpanan.pokok)}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-65">Wajib</p>
              <p className="font-mono text-sm font-medium">{formatRupiah(simpanan.wajib)}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-65">Sukarela</p>
              <p className="font-mono text-sm font-medium">{formatRupiah(simpanan.sukarela)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content space-y-6">
        <section>
          <SectionLabel title="Aksi cepat" className="mb-3" />
          <div className="grid grid-cols-4 gap-3">
            {aksiCepat.map(({ label, href, Icon }) => (
              <Link key={href} href={href} className="flex flex-col items-center gap-2">
                <div className="app-quick-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <span className="text-center text-[11px] font-semibold leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        <PengumumanBanner items={daftarPengumuman} />

        <section>
          <SectionHead title="Produk Unggulan" href="/marketplace" inset />
          <div className="h-scroll pb-1">
            {produkUnggulan.map((p) => (
              <Link
                key={p.id}
                href="/marketplace"
                className="app-card app-card-interactive min-w-[140px] shrink-0 p-3"
              >
                {p.gambar && (
                  <img src={p.gambar} alt={p.nama} className="mb-2 h-20 w-full rounded-lg object-cover" />
                )}
                <p className="text-xs font-bold leading-tight">{p.nama}</p>
                <p className="mt-1 font-mono text-sm font-bold text-merah">
                  {formatRupiah(p.harga)}
                  <span className="text-[10px] font-normal text-abu-teks">/{p.satuan}</span>
                </p>
                <Tag variant="hijau" className="mt-1">
                  ⭐ {p.rating}
                </Tag>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
