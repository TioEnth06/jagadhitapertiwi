"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Bell,
  Lock,
  Phone,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import {
  dokumenAnggota,
  faqItems,
  kontakPengurus,
  notifikasiDefault,
  rekeningBank,
} from "@/lib/data/mockData";
import type { AkunMenuView } from "@/lib/types";

const menuItems: { id: AkunMenuView; icon: typeof FileText; label: string; emoji: string }[] = [
  { id: "dokumen", icon: FileText, label: "Dokumen Saya", emoji: "📄" },
  { id: "rekening", icon: CreditCard, label: "Rekening Bank", emoji: "💳" },
  { id: "notifikasi", icon: Bell, label: "Notifikasi", emoji: "🔔" },
  { id: "ganti-pin", icon: Lock, label: "Ganti PIN", emoji: "🔒" },
  { id: "hubungi", icon: Phone, label: "Hubungi Pengurus", emoji: "📞" },
  { id: "bantuan", icon: HelpCircle, label: "Bantuan & FAQ", emoji: "❓" },
];

export default function ProfilPage() {
  const router = useRouter();
  const { anggota, logout, isAuthenticated } = useAuthStore();
  const [view, setView] = useState<AkunMenuView>("menu");
  const [notif, setNotif] = useState(notifikasiDefault);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !anggota) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-merah border-t-transparent" />
      </div>
    );
  }

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
        <div className="px-5 py-4">
          {view === "dokumen" &&
            dokumenAnggota.map((d) => (
              <div key={d.id} className="kartu mb-2 flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold">{d.nama}</p>
                  <p className="text-xs text-abu-teks">{d.jenis} · {d.tanggalTerbit}</p>
                </div>
                <Tag variant="hijau">{d.status}</Tag>
              </div>
            ))}
          {view === "rekening" &&
            rekeningBank.map((r) => (
              <div key={r.nomor} className="kartu mb-2 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.bank}</p>
                  {r.utama && <Tag variant="merah">Utama</Tag>}
                </div>
                <p className="font-mono text-sm">{r.nomor}</p>
                <p className="text-xs text-abu-teks">{r.atasNama} · {r.cabang}</p>
              </div>
            ))}
          {view === "notifikasi" &&
            Object.entries(notif).map(([key, val]) => (
              <label key={key} className="kartu mb-2 flex items-center justify-between p-4">
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
            <div className="space-y-4">
              <input type="password" className="input" placeholder="PIN lama" />
              <input type="password" className="input" placeholder="PIN baru" />
              <input type="password" className="input" placeholder="Konfirmasi PIN baru" />
              <Btn>Simpan PIN Baru</Btn>
            </div>
          )}
          {view === "hubungi" && (
            <div className="kartu p-4">
              <p className="font-bold">{kontakPengurus.nama}</p>
              <p className="text-sm text-abu-teks">{kontakPengurus.jabatan}</p>
              <p className="mt-2 font-mono text-merah">{kontakPengurus.telepon}</p>
              <p className="mt-2 text-sm text-abu-teks">{kontakPengurus.jamOperasional}</p>
              <p className="mt-2 text-sm">{kontakPengurus.alamat}</p>
              <Btn variant="wa" className="mt-4">
                Hubungi via WhatsApp
              </Btn>
            </div>
          )}
          {view === "bantuan" &&
            faqItems.map((f) => (
              <details key={f.id} className="kartu mb-2 p-4">
                <summary className="cursor-pointer text-sm font-semibold">{f.pertanyaan}</summary>
                <p className="mt-2 text-sm text-abu-teks">{f.jawaban}</p>
              </details>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="bg-merah px-5 pb-6 pt-8 text-white">
        <div className="rounded-2xl bg-white/15 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
              {anggota.nama.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold">{anggota.namaLengkap}</p>
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

      <div className="px-5 py-4">
        {menuItems.map(({ id, icon: Icon, label, emoji }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className="flex w-full items-center gap-3 border-b border-abu-border py-4 text-left"
          >
            <span className="text-xl">{emoji}</span>
            <span className="flex-1 text-sm font-semibold">{label}</span>
            <ChevronRight size={18} className="text-abu-teks" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-btn border border-merah py-3 text-sm font-semibold text-merah"
        >
          <LogOut size={18} />
          Keluar
        </button>
        <Link href="/admin" className="mt-4 block text-center text-xs text-abu-teks">
          Admin demo →
        </Link>
      </div>
    </div>
  );
}
