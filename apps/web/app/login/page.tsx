"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { statistikKoperasi } from "@/lib/data/mockData";
import Btn from "@/components/ui/Btn";
import FormGroup from "@/components/ui/FormGroup";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [noAnggota, setNoAnggota] = useState("JDP-0247");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!noAnggota.trim()) {
      setError("Nomor anggota wajib diisi.");
      return;
    }
    if (!pin.trim()) {
      setError("PIN wajib diisi.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(noAnggota.trim());
      setLoading(false);
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-merah px-6 pb-10 pt-12 text-white">
        <div className="mx-auto max-w-[390px]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
            JDP
          </div>
          <h1 className="font-display text-2xl font-bold leading-tight">
            Koperasi Jaga Dhita Pertiwi
          </h1>
          <p className="mt-2 text-sm opacity-80">
            Masuk ke akun anggota untuk kelola simpanan, pinjaman, dan pasar.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-xl bg-white/15 p-3">
              <p className="font-mono text-lg font-bold">
                {statistikKoperasi.anggotaAktif.toLocaleString("id-ID")}
              </p>
              <p className="text-xs opacity-75">Anggota Aktif</p>
            </div>
            <div className="rounded-xl bg-white/15 p-3">
              <p className="font-mono text-lg font-bold">95%</p>
              <p className="text-xs opacity-75">Kepuasan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[390px] px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup label="Nomor Anggota" htmlFor="noAnggota">
            <Input
              id="noAnggota"
              mono
              value={noAnggota}
              onChange={(e) => setNoAnggota(e.target.value.toUpperCase())}
              placeholder="JDP-0247"
            />
          </FormGroup>
          <FormGroup label="PIN" htmlFor="pin">
            <div className="relative">
              <Input
                id="pin"
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Masukkan PIN"
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-abu-teks"
                aria-label={showPin ? "Sembunyikan PIN" : "Tampilkan PIN"}
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </FormGroup>
          {error && (
            <p className="text-sm font-medium text-merah" role="alert">
              {error}
            </p>
          )}
          <Btn type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </Btn>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-abu-border" />
          <span className="text-xs text-abu-teks">atau</span>
          <div className="h-px flex-1 bg-abu-border" />
        </div>

        <Btn variant="wa" type="button">
          Masuk via WhatsApp
        </Btn>

        <div className="mt-6 space-y-2 text-center text-sm">
          <Link href="#" className="block font-semibold text-merah">
            Lupa PIN?
          </Link>
          <Link href="#" className="block text-abu-teks">
            Belum punya akun? Daftar anggota
          </Link>
          <Link href="/" className="block text-abu-teks">
            ← Kembali ke landing
          </Link>
        </div>
      </div>
    </div>
  );
}
