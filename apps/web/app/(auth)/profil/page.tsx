"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Bell,
  Lock,
  Phone,
  HelpCircle,
  LogOut,
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import MenuList from "@/components/shared/MenuList";
import KontakPengurusCard from "@/components/shared/account/KontakPengurusCard";
import FaqAccordionList from "@/components/shared/account/FaqAccordionList";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import {
  dokumenAnggota,
  faqItems,
  kontakPengurus,
  notifikasiDefault,
  rekeningBank,
} from "@/lib/data/mockData";
import type { AkunMenuView } from "@/lib/types";

const menuItems = [
  { id: "dokumen" as const, Icon: FileText, label: "Dokumen Saya", description: "KTP, KK, dan sertifikat" },
  { id: "rekening" as const, Icon: CreditCard, label: "Rekening Bank", description: "Rekening pencairan & penarikan" },
  { id: "notifikasi" as const, Icon: Bell, label: "Notifikasi", description: "Pengaturan pemberitahuan" },
  { id: "ganti-pin" as const, Icon: Lock, label: "Ganti PIN", description: "Keamanan akun anggota" },
  { id: "hubungi" as const, Icon: Phone, label: "Hubungi Pengurus", description: "Kontak kantor koperasi" },
  { id: "bantuan" as const, Icon: HelpCircle, label: "Bantuan & FAQ", description: "Pertanyaan umum anggota" },
];

export default function ProfilPage() {
  const router = useRouter();
  const { anggota, logout } = useAuthStore();
  const [view, setView] = useState<AkunMenuView>("menu");
  const [notif, setNotif] = useState(notifikasiDefault);
  const [pinBaru, setPinBaru] = useState("");
  const [pinSukses, setPinSukses] = useState("");

  if (!anggota) return null;

  if (view !== "menu") {
    const titles: Record<Exclude<AkunMenuView, "menu">, string> = {
      dokumen: "Dokumen Saya",
      rekening: "Rekening Bank",
      notifikasi: "Pengaturan Notifikasi",
      "ganti-pin": "Ganti PIN",
      hubungi: "Hubungi Pengurus",
      bantuan: "Bantuan & FAQ",
    };

    return (
      <div className="pb-6">
        <TopBar title={titles[view]} onBack={() => setView("menu")} />
        <div className="app-content space-y-3">
          {view === "dokumen" &&
            dokumenAnggota.map((d) => (
              <div key={d.id} className="app-card flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{d.nama}</p>
                  <p className="text-xs text-abu-teks">
                    {d.jenis} · {d.tanggalTerbit}
                  </p>
                </div>
                <Tag variant="hijau" className="shrink-0">
                  {d.status}
                </Tag>
              </div>
            ))}
          {view === "rekening" &&
            rekeningBank.map((r) => (
              <div key={r.nomor} className="app-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.bank}</p>
                  {r.utama && <Tag variant="merah">Utama</Tag>}
                </div>
                <p className="font-mono text-sm">{r.nomor}</p>
                <p className="text-xs text-abu-teks">
                  {r.atasNama} · {r.cabang}
                </p>
              </div>
            ))}
          {view === "notifikasi" &&
            Object.entries(notif).map(([key, val]) => (
              <label key={key} className="app-card flex items-center justify-between p-4">
                <span className="text-sm font-semibold capitalize">{key}</span>
                <input
                  type="checkbox"
                  checked={val}
                  onChange={(e) => setNotif({ ...notif, [key]: e.target.checked })}
                  className="h-5 w-5 accent-merah"
                />
              </label>
            ))}
          {view === "ganti-pin" && (
            <div className="app-form-card space-y-4">
              <input type="password" className="input" placeholder="PIN lama" />
              <input
                type="password"
                className="input"
                placeholder="PIN baru"
                value={pinBaru}
                onChange={(e) => setPinBaru(e.target.value)}
              />
              <input type="password" className="input" placeholder="Konfirmasi PIN baru" />
              {pinSukses && <p className="text-sm font-semibold text-hijau">{pinSukses}</p>}
              <Btn
                onClick={() => {
                  if (pinBaru.length < 4) return;
                  setPinSukses("PIN berhasil diperbarui (demo).");
                  setPinBaru("");
                }}
              >
                Simpan PIN Baru
              </Btn>
            </div>
          )}
          {view === "hubungi" && (
            <KontakPengurusCard kontak={kontakPengurus} showAlamat />
          )}
          {view === "bantuan" && <FaqAccordionList items={faqItems} />}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <div className="app-hero-merah px-5 pb-6 pt-8 text-white">
        <div className="rounded-2xl bg-white/15 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
              {anggota.nama.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold leading-snug">{anggota.namaLengkap}</p>
              <p className="font-mono text-sm opacity-80">{anggota.noAnggota}</p>
              <Tag variant="hijau" className="mt-1 !bg-white/20 !text-white">
                {anggota.status}
              </Tag>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/20 pt-4 text-center">
            <div>
              <p className="font-mono text-sm font-bold">{anggota.lamaBergabung.split(" ")[0]}</p>
              <p className="text-[10px] opacity-70">Tahun</p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold">{anggota.totalTransaksi}</p>
              <p className="text-[10px] opacity-70">Transaksi</p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold">{anggota.skorKredit}</p>
              <p className="text-[10px] opacity-70">Kredit</p>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content space-y-4">
        <MenuList
          items={menuItems.map((item) => ({
            ...item,
            onClick: () => setView(item.id),
          }))}
        />
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-merah py-3.5 text-sm font-semibold text-merah transition-colors hover:bg-merah-muda"
        >
          <LogOut size={18} />
          Keluar
        </button>
        <Link href="/admin" className="app-link-muted text-xs">
          Admin demo →
        </Link>
      </div>
    </div>
  );
}
