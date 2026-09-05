"use client";

import { useState } from "react";
import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import TransferInstruksiKoperasi from "@/components/simpanan/TransferInstruksiKoperasi";
import {
  estimasiShuTahunan,
  MIN_SETOR_SUKARELA,
  proyeksiSaldoSetelah,
  useSimpananStore,
} from "@/lib/stores/useSimpananStore";
import { lokasiKoperasi, metodeTransferPembayaran } from "@/lib/data/mockData";
import { formatRupiah } from "@/lib/format";
import type { JenisSimpanan, MetodeBayar, MetodeTransferId } from "@/lib/types";

const CHIP_SUKARELA = [100_000, 200_000, 500_000, 1_000_000];
const STEPS = ["Jenis", "Nominal & Bayar", "Konfirmasi"];

interface SetorSimpananPanelProps {
  onSuccess: (message: string) => void;
  onClose: () => void;
}

export default function SetorSimpananPanel({ onSuccess, onClose }: SetorSimpananPanelProps) {
  const simpanan = useSimpananStore((s) => s.simpanan);
  const setor = useSimpananStore((s) => s.setor);

  const [step, setStep] = useState(1);
  const [jenis, setJenis] = useState<JenisSimpanan | null>(null);
  const [nominal, setNominal] = useState(MIN_SETOR_SUKARELA);
  const [metode, setMetode] = useState<MetodeBayar>("transfer");
  const [metodeTransfer, setMetodeTransfer] = useState<MetodeTransferId | null>(null);
  const [lokasiId, setLokasiId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [hasil, setHasil] = useState<{ referensi: string; status: "selesai" | "menunggu" } | null>(
    null,
  );

  const wajibTersedia = simpanan.wajibBulanIniStatus === "BELUM";
  const proyeksi = jenis ? proyeksiSaldoSetelah(simpanan, jenis, nominal) : null;
  const transferOption = metodeTransferPembayaran.find((m) => m.id === metodeTransfer);
  const lokasiTerpilih = lokasiKoperasi.find((l) => l.id === lokasiId);

  const metodeLengkap =
    metode === "transfer" ? metodeTransfer !== null : lokasiId !== null;

  const handlePilihJenis = (j: JenisSimpanan) => {
    setJenis(j);
    setError("");
    setNominal(j === "wajib" ? simpanan.wajibBulanIni : 200_000);
    setMetodeTransfer(null);
    setLokasiId(null);
    setStep(2);
  };

  const handleLanjutKeKonfirmasi = () => {
    setError("");
    if (jenis === "sukarela" && (nominal < MIN_SETOR_SUKARELA || !Number.isFinite(nominal))) {
      setError(`Minimal setor sukarela ${formatRupiah(MIN_SETOR_SUKARELA)}.`);
      return;
    }
    if (!metodeLengkap) {
      setError(
        metode === "transfer"
          ? "Pilih metode transfer terlebih dahulu."
          : "Pilih lokasi kantor koperasi terlebih dahulu.",
      );
      return;
    }
    setStep(3);
  };

  const handleKonfirmasi = () => {
    if (!jenis || !metodeLengkap) return;
    const result = setor({
      jenis,
      nominal,
      metode,
      metodeTransfer: metodeTransfer ?? undefined,
      lokasiId: lokasiId ?? undefined,
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setHasil({ referensi: result.referensi, status: result.status });
    setStep(4);
  };

  const handleSelesai = () => {
    if (!jenis || !hasil) return;
    if (hasil.status === "menunggu") {
      onSuccess(`Setoran tercatat (${hasil.referensi}). Menunggu verifikasi transfer.`);
    } else {
      onSuccess(
        jenis === "wajib"
          ? "Setoran simpanan wajib berhasil dicatat!"
          : "Setoran simpanan sukarela berhasil dicatat!",
      );
    }
    onClose();
  };

  if (step === 4 && hasil && jenis) {
    return (
      <div className="space-y-4">
        <div className="kartu space-y-3 border-l-4 border-l-merah p-4 text-center">
          <span className="text-3xl" aria-hidden="true">
            {hasil.status === "selesai" ? "✓" : "⏳"}
          </span>
          <p className="font-bold">
            {hasil.status === "selesai" ? "Setoran Berhasil" : "Menunggu Verifikasi"}
          </p>
          <p className="font-mono text-xs text-abu-teks">{hasil.referensi}</p>
          <p className="font-mono text-xl font-bold text-merah">{formatRupiah(nominal)}</p>
          <p className="text-xs text-abu-teks">
            {hasil.status === "selesai"
              ? "Saldo simpanan Anda sudah diperbarui."
              : "Saldo akan bertambah setelah transfer dikonfirmasi pengurus (1×24 jam)."}
          </p>
        </div>

        {metode === "transfer" && transferOption && hasil.status === "menunggu" && (
          <TransferInstruksiKoperasi
            metode={transferOption}
            nominal={nominal}
            referensi={hasil.referensi}
          />
        )}

        {metode === "tunai" && lokasiTerpilih && (
          <div className="kartu space-y-2 p-4">
            <p className="text-sm font-bold">Kunjungi lokasi setor</p>
            <p className="font-semibold">{lokasiTerpilih.nama}</p>
            <p className="text-sm text-abu-teks">{lokasiTerpilih.alamat}</p>
            <p className="text-xs text-abu-teks">{lokasiTerpilih.jam}</p>
            <Tag variant="hijau">{lokasiTerpilih.petugas}</Tag>
          </div>
        )}

        <Btn onClick={handleSelesai}>Selesai</Btn>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
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

      {step === 1 && (
        <>
          <p className="text-sm text-abu-teks">Pilih jenis simpanan yang ingin Anda setor.</p>
          <button
            type="button"
            disabled={!wajibTersedia}
            onClick={() => handlePilihJenis("wajib")}
            className={`kartu w-full p-4 text-left ${!wajibTersedia ? "opacity-50" : ""}`}
          >
            <p className="font-bold">Simpanan Wajib Bulan Ini</p>
            <p className="mt-1 text-sm text-abu-teks">
              {formatRupiah(simpanan.wajibBulanIni)} —{" "}
              {wajibTersedia ? "Belum lunas" : "Sudah lunas ✓"}
            </p>
          </button>
          <button
            type="button"
            onClick={() => handlePilihJenis("sukarela")}
            className="kartu w-full p-4 text-left"
          >
            <p className="font-bold">Simpanan Sukarela</p>
            <p className="mt-1 text-sm text-abu-teks">
              Minimal {formatRupiah(MIN_SETOR_SUKARELA)} · Bebas nominal
            </p>
            <p className="mt-2 text-xs text-abu-teks">
              Estimasi SHU ~{formatRupiah(estimasiShuTahunan(simpanan.sukarela + 200_000))}/tahun
            </p>
          </button>
        </>
      )}

      {step === 2 && jenis && (
        <>
          <div className="kartu p-4 text-center">
            <p className="text-sm text-abu-teks">
              {jenis === "wajib" ? "Simpanan Wajib" : "Simpanan Sukarela"}
            </p>
            {jenis === "sukarela" ? (
              <>
                <input
                  type="number"
                  min={MIN_SETOR_SUKARELA}
                  step={10000}
                  value={nominal}
                  onChange={(e) => setNominal(Number(e.target.value))}
                  className="input mt-2 text-center font-mono text-lg font-bold"
                  aria-label="Nominal setor"
                />
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {CHIP_SUKARELA.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setNominal(v)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        nominal === v ? "bg-merah text-white" : "bg-abu-bg text-abu-teks"
                      }`}
                    >
                      {formatRupiah(v)}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-1 font-mono text-2xl font-bold">{formatRupiah(nominal)}</p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Metode pembayaran</p>
            <div className="grid grid-cols-2 gap-2">
              {(["transfer", "tunai"] as MetodeBayar[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMetode(m);
                    setMetodeTransfer(null);
                    setLokasiId(null);
                    setError("");
                  }}
                  className={`min-h-[48px] rounded-xl text-sm font-semibold ${
                    metode === m ? "bg-merah text-white" : "kartu"
                  }`}
                >
                  {m === "transfer" ? "Transfer Bank" : "Tunai di Kantor"}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-abu-teks">
              {metode === "transfer"
                ? "Saldo bertambah setelah transfer diverifikasi pengurus."
                : "Setor langsung ke petugas koperasi — saldo langsung bertambah."}
            </p>
          </div>

          {metode === "transfer" && (
            <div>
              <p className="mb-2 text-sm font-semibold">Pilih metode transfer</p>
              <div className="space-y-2">
                {metodeTransferPembayaran.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMetodeTransfer(opt.id)}
                    className={`kartu w-full p-4 text-left ${
                      metodeTransfer === opt.id ? "border-2 border-merah" : ""
                    }`}
                  >
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-xs text-abu-teks">{opt.deskripsi}</p>
                  </button>
                ))}
              </div>
              {transferOption && (
                <div className="mt-3">
                  <TransferInstruksiKoperasi metode={transferOption} nominal={nominal} />
                </div>
              )}
            </div>
          )}

          {metode === "tunai" && (
            <div>
              <p className="mb-2 text-sm font-semibold">Pilih lokasi koperasi JDP</p>
              <div className="space-y-2">
                {lokasiKoperasi.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLokasiId(loc.id)}
                    className={`kartu w-full p-4 text-left ${
                      lokasiId === loc.id ? "border-2 border-merah" : ""
                    }`}
                  >
                    <p className="font-semibold">{loc.nama}</p>
                    <p className="mt-1 text-xs text-abu-teks">{loc.alamat}</p>
                    <p className="mt-1 text-xs text-abu-teks">{loc.jam}</p>
                    <Tag variant="hijau" className="mt-2">
                      {loc.petugas}
                    </Tag>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm font-medium text-merah" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Btn variant="outline" onClick={() => setStep(1)}>
              ← Kembali
            </Btn>
            <Btn onClick={handleLanjutKeKonfirmasi}>Lanjut →</Btn>
          </div>
        </>
      )}

      {step === 3 && jenis && proyeksi && (
        <>
          <div className="kartu space-y-3 border-l-4 border-l-merah p-4">
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Jenis</span>
              <span className="font-semibold">
                {jenis === "wajib" ? "Simpanan Wajib" : "Simpanan Sukarela"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Nominal</span>
              <span className="font-mono font-bold text-merah">{formatRupiah(nominal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-abu-teks">Metode</span>
              <span className="font-semibold">
                {metode === "transfer"
                  ? transferOption?.label ?? "Transfer Bank"
                  : "Tunai di Kantor"}
              </span>
            </div>
            {metode === "tunai" && lokasiTerpilih && (
              <div className="border-t border-abu-border pt-2 text-sm">
                <p className="text-abu-teks">Lokasi setor</p>
                <p className="font-semibold">{lokasiTerpilih.nama}</p>
              </div>
            )}
            <div className="border-t border-abu-border pt-2 text-sm">
              <p className="mb-1 font-semibold">Proyeksi saldo setelah setor</p>
              <div className="flex justify-between">
                <span className="text-abu-teks">Total simpanan</span>
                <span className="font-mono font-semibold">
                  {formatRupiah(metode === "tunai" ? proyeksi.total : simpanan.total)}
                  {metode === "transfer" && (
                    <span className="ml-1 text-xs font-normal text-abu-teks">(setelah verifikasi)</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-merah" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Btn variant="outline" onClick={() => setStep(2)}>
              ← Kembali
            </Btn>
            <Btn onClick={handleKonfirmasi}>Konfirmasi Setor</Btn>
          </div>
        </>
      )}
    </div>
  );
}
