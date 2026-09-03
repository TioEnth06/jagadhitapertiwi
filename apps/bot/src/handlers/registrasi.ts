import { kirimPesan } from "../fonnte";

// Simpan state sementara per nomor WA (produksi: pakai Redis)
const sesi = new Map<string, { step: number; data: Record<string, string> }>();

type Pesan = { dari: string; teks: string };

export async function handleRegistrasi(msg: Pesan): Promise<void> {
  const { dari, teks } = msg;
  const input = teks.trim().toLowerCase();

  // Mulai alur pendaftaran
  if (input === "daftar" || input === "1") {
    sesi.set(dari, { step: 1, data: {} });
    await kirimPesan(
      dari,
      `Selamat datang di *Koperasi Jaga Dhita Pertiwi* 🇮🇩\n\n` +
      `Kami akan memandu proses pendaftaran Anda.\n\n` +
      `*Langkah 1/5*\n` +
      `Silakan kirimkan *nama lengkap* Anda sesuai KTP:`
    );
    return;
  }

  const s = sesi.get(dari);
  if (!s) return;

  switch (s.step) {
    case 1:
      s.data.nama = teks;
      s.step = 2;
      await kirimPesan(dari,
        `Terima kasih, *${teks}*.\n\n*Langkah 2/5*\nKirimkan *nomor NIK* (16 digit) sesuai KTP Anda:`
      );
      break;

    case 2:
      if (!/^\d{16}$/.test(teks.replace(/\s/g, ""))) {
        await kirimPesan(dari, "⚠️ NIK harus 16 digit angka. Silakan kirim ulang:");
        return;
      }
      s.data.nik = teks;
      s.step = 3;
      await kirimPesan(dari,
        `*Langkah 3/5*\nKirimkan *alamat lengkap* Anda (desa/kelurahan, kecamatan, kabupaten):`
      );
      break;

    case 3:
      s.data.alamat = teks;
      s.step = 4;
      await kirimPesan(dari,
        `*Langkah 4/5*\nPilih jenis keanggotaan:\n\n` +
        `1️⃣ Individu (petani, UMKM tani)\n` +
        `2️⃣ Korporat (perusahaan, BUMDes, koperasi lain)\n\n` +
        `Balas dengan *1* atau *2*:`
      );
      break;

    case 4:
      if (!["1", "2"].includes(teks)) {
        await kirimPesan(dari, "Balas dengan angka *1* (individu) atau *2* (korporat):");
        return;
      }
      s.data.jenis = teks === "1" ? "individu" : "korporat";
      s.step = 5;
      await kirimPesan(dari,
        `*Langkah 5/5 — Terakhir!*\n\n` +
        `Foto KTP Anda dan kirimkan di sini.\n` +
        `Pastikan foto jelas dan terbaca ya.`
      );
      break;

    case 5:
      // Di sini normalnya cek apakah pesan berisi gambar
      // Untuk MVP: asumsikan sudah dikirim
      s.step = 6;
      await kirimPesan(dari,
        `✅ *Pendaftaran Anda diterima!*\n\n` +
        `Ringkasan data:\n` +
        `• Nama: ${s.data.nama}\n` +
        `• Jenis: ${s.data.jenis === "individu" ? "Anggota Individu" : "Anggota Korporat"}\n\n` +
        `Pengurus akan memverifikasi dalam *1–3 hari kerja*.\n` +
        `Anda akan mendapat notifikasi di WhatsApp ini saat akun aktif.\n\n` +
        `Terima kasih telah bergabung! 🌾`
      );
      sesi.delete(dari);
      break;
  }
}
