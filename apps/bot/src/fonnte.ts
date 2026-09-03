import axios from "axios";

const FONNTE_TOKEN = process.env.FONNTE_TOKEN!;
const BASE_URL = "https://api.fonnte.com";

/**
 * Kirim pesan WhatsApp via Fonnte
 */
export async function kirimPesan(ke: string, pesan: string): Promise<boolean> {
  try {
    const res = await axios.post(
      `${BASE_URL}/send`,
      { target: ke, message: pesan, countryCode: "62" },
      { headers: { Authorization: FONNTE_TOKEN } }
    );
    return res.data.status === true;
  } catch (err) {
    console.error("Fonnte error:", err);
    return false;
  }
}
