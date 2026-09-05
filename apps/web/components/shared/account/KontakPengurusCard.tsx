import Btn from "@/components/ui/Btn";
import type { KontakPengurus } from "@/lib/types";

interface KontakPengurusCardProps {
  kontak: KontakPengurus;
  variant?: "app" | "b2b";
  subtitle?: string;
  showAlamat?: boolean;
}

export default function KontakPengurusCard({
  kontak,
  variant = "app",
  subtitle,
  showAlamat = false,
}: KontakPengurusCardProps) {
  const isB2b = variant === "b2b";

  return (
    <div className={isB2b ? "b2b-card b2b-accent-bg p-5" : "app-card p-5"}>
      <p className="font-display text-lg font-bold">{kontak.nama}</p>
      <p className={`mt-1 text-sm ${isB2b ? "text-[var(--landing-abu-teks)]" : "text-abu-teks"}`}>
        {subtitle ?? kontak.jabatan}
      </p>
      <p
        className={`mt-3 font-mono text-base font-bold ${isB2b ? "b2b-accent" : "text-merah"}`}
      >
        {kontak.telepon}
      </p>
      <p className={`mt-2 text-sm ${isB2b ? "text-[var(--landing-abu-teks)]" : "text-abu-teks"}`}>
        {kontak.jamOperasional}
      </p>
      {showAlamat && <p className="mt-2 text-sm">{kontak.alamat}</p>}
      <Btn variant="wa" className={isB2b ? "mt-5" : "mt-4"}>
        Hubungi via WhatsApp
      </Btn>
    </div>
  );
}
