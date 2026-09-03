"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import DemoToast from "@/components/ui/DemoToast";
import SimulasiCicilan from "@/components/pinjaman/SimulasiCicilan";
import { usePinjamanStore } from "@/lib/stores/usePinjamanStore";
import { useSimpananStore } from "@/lib/stores/useSimpananStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";
import { MAX_PINJAMAN, MIN_PINJAMAN } from "@/lib/data/mockData";
import {
  BUNGA_FLAT_PERSEN,
  clampJumlahPinjaman,
  hitungKelayakanPinjaman,
  hitungPinjaman,
  hitungPlafonPinjaman,
} from "@/lib/hitungPinjaman";
import { formatRupiah } from "@/lib/format";

const CHIP_PRESET = [1_000_000, 2_000_000, 5_000_000];
const TENOR_OPTIONS = [3, 6, 12];
const STEPS = ["Simulasi", "Tujuan", "Konfirmasi"];

export default function AjukanPinjamanPage() {
  const router = useRouter();
  const ajukan = usePinjamanStore((s) => s.ajukan);
  const simpananWajib = useSimpananStore((s) => s.simpanan.wajib);
  const plafon = useMemo(() => hitungPlafonPinjaman(simpananWajib), [simpananWajib]);
  const { message, showToast, dismiss } = useDemoToast();

  const [step, setStep] = useState(1);
  const [jumlah, setJumlah] = useState(() => clampJumlahPinjaman(3_000_000, plafon));
  const [tenor, setTenor] = useState(6);
  const [tujuan, setTujuan] = useState("");
  const [tujuanError, setTujuanError] = useState("");

  const jumlahEfektif = useMemo(
    () => clampJumlahPinjaman(jumlah, plafon),
    [jumlah, plafon],
  );
  const ringkasan = useMemo(() => hitungPinjaman(jumlahEfektif, tenor), [jumlahEfektif, tenor]);
  const kelayakan = useMemo(
    () => hitungKelayakanPinjaman(jumlahEfektif, plafon),
    [jumlahEfektif, plafon],
  );

  const handleSubmit = () => {
    const baru = ajukan({
      jumlah: jumlahEfektif,
      tenor,
      tujuan: tujuan.trim(),
      ringkasan,
    });
    showToast(`Pengajuan ${baru.noReferensi} berhasil dikirim!`);
    setTimeout(() => router.push("/pinjaman"), 1500);
  };

  return (
    <div className="pb-6">
      <TopBar title="Ajukan Pinjaman" backHref="/pinjaman" />

      <div className="flex gap-2 px-5 py-4">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1 text-center">
            <div
              className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step > i + 1
                  ? "bg-hijau text-white"
                  : step === i + 1
                    ? "bg-merah text-white"
                    : "bg-abu-bg text-abu-teks"
              }`}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <p className="text-[10px] font-semibold text-abu-teks">{label}</p>
          </div>
        ))}
      </div>

      <div className="px-5 space-y-5">
        {step === 1 && (
          <>
            <div className="kartu text-center">
              <p className="font-mono text-3xl font-bold">{formatRupiah(jumlahEfektif)}</p>
              <p className="mt-1 text-xs text-abu-teks">
                Plafon {formatRupiah(plafon)} · Min {formatRupiah(MIN_PINJAMAN)}
              </p>
            </div>
            <input
              type="range"
              min={MIN_PINJAMAN}
              max={Math.max(plafon, MIN_PINJAMAN)}
              step={100_000}
              value={jumlahEfektif}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className="w-full accent-merah"
              aria-label="Jumlah pinjaman"
            />
            <div className="flex flex-wrap gap-2">
              {CHIP_PRESET.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setJumlah(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    jumlahEfektif === c ? "bg-merah text-white" : "bg-abu-bg text-abu-teks"
                  }`}
                >
                  {formatRupiah(c)}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {TENOR_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenor(t)}
                  className={`flex-1 min-h-touch rounded-btn text-sm font-semibold ${
                    tenor === t ? "bg-merah text-white" : "kartu"
                  }`}
                >
                  {t} bln
                </button>
              ))}
            </div>
            <SimulasiCicilan jumlah={jumlahEfektif} tenor={tenor} bungaPerBulan={BUNGA_FLAT_PERSEN} />
            {!kelayakan.layak && (
              <p className="text-sm text-merah">{kelayakan.pesan}</p>
            )}
            <Btn disabled={!kelayakan.layak} onClick={() => setStep(2)}>
              Lanjut ke Tujuan
            </Btn>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label htmlFor="tujuan" className="mb-1.5 block text-sm font-semibold">
                Tujuan Pinjaman
              </label>
              <textarea
                id="tujuan"
                className="input min-h-[120px] resize-none"
                value={tujuan}
                onChange={(e) => {
                  setTujuan(e.target.value);
                  setTujuanError("");
                }}
                placeholder="Jelaskan tujuan pinjaman (min. 10 karakter)..."
              />
              {tujuanError && <p className="mt-2 text-sm text-merah">{tujuanError}</p>}
            </div>
            <Btn
              onClick={() => {
                if (tujuan.trim().length < 10) {
                  setTujuanError("Tujuan pinjaman minimal 10 karakter.");
                  return;
                }
                setStep(3);
              }}
            >
              Lanjut ke Konfirmasi
            </Btn>
            <Btn variant="outline" onClick={() => setStep(1)}>
              Kembali
            </Btn>
          </>
        )}

        {step === 3 && (
          <>
            <div className="kartu space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Jumlah</span>
                <span className="font-mono font-bold">{formatRupiah(jumlahEfektif)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Tenor</span>
                <span className="font-bold">{tenor} bulan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Bunga</span>
                <span>{BUNGA_FLAT_PERSEN}% flat/bulan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-abu-teks">Cicilan/bulan</span>
                <span className="font-mono font-bold text-merah">
                  {formatRupiah(ringkasan.cicilanPerBulan)}
                </span>
              </div>
              <div className="border-t border-abu-border pt-2 text-sm">
                <p className="text-abu-teks">Tujuan</p>
                <p className="mt-1">{tujuan}</p>
              </div>
            </div>
            <Btn onClick={handleSubmit}>Kirim Pengajuan</Btn>
            <Btn variant="outline" onClick={() => setStep(2)}>
              Kembali
            </Btn>
          </>
        )}
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
