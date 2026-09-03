import express from "express";
import dotenv from "dotenv";
import { handleRegistrasi } from "./handlers/registrasi";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Webhook dari Fonnte — semua pesan masuk ke nomor WA koperasi
 * masuk ke sini.
 */
app.post("/webhook", async (req, res) => {
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({ ok: false });
  }

  console.log(`[WA] ${sender}: ${message}`);

  // Router sederhana berdasarkan konten pesan
  const teks = (message as string).toLowerCase().trim();

  if (teks === "daftar" || teks === "1" || teks === "mulai") {
    await handleRegistrasi({ dari: sender, teks: message });
  } else if (teks === "halo" || teks === "hai" || teks === "hello") {
    // Tampilkan menu utama
    const { kirimPesan } = await import("./fonnte");
    await kirimPesan(
      sender,
      `Halo! 👋 Selamat datang di *Koperasi Jaga Dhita Pertiwi*.\n\n` +
      `Pilih menu:\n` +
      `1️⃣ *Daftar* — Jadi anggota baru\n` +
      `2️⃣ *Saldo* — Cek simpanan\n` +
      `3️⃣ *Pinjaman* — Info & ajukan pinjaman\n` +
      `4️⃣ *Bantuan* — Hubungi pengurus\n\n` +
      `Balas dengan angka pilihan Anda.`
    );
  } else {
    // Cek apakah sedang dalam sesi registrasi
    await handleRegistrasi({ dari: sender, teks: message });
  }

  res.json({ ok: true });
});

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", service: "jdp-bot" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🤖 JDP WhatsApp Bot running on port ${PORT}`);
  console.log(`   Webhook: POST /webhook`);
});
