"use client";
import { useState, useEffect } from "react";
import { createClient } from "../supabase";
import { anggota as demoAnggota, simpanan as demoSimpanan } from "@/lib/data/mockData";

export type Anggota = {
  id: string;
  nomor_anggota: string;
  nama: string;
  jenis: "individu" | "korporat";
  status: "aktif" | "nonaktif" | "menunggu";
  bergabung_sejak: string;
  total_simpanan: number;
  simpanan_pokok: number;
  simpanan_wajib: number;
  simpanan_sukarela: number;
  wa_number?: string;
};

const DEMO_ANGGOTA: Anggota = {
  id: "demo",
  nomor_anggota: demoAnggota.noAnggota,
  nama: demoAnggota.nama,
  jenis: "individu",
  status: "aktif",
  bergabung_sejak: "2018-03-01",
  total_simpanan: demoSimpanan.total,
  simpanan_pokok: demoSimpanan.pokok,
  simpanan_wajib: demoSimpanan.wajib,
  simpanan_sukarela: demoSimpanan.sukarela,
};

export function useAnggota() {
  const [anggota, setAnggota] = useState<Anggota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnggota() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("xxxx")) {
          setAnggota(DEMO_ANGGOTA);
          return;
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setAnggota(DEMO_ANGGOTA);
          return;
        }

        const { data, error: dbError } = await supabase
          .from("anggota")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (dbError) throw dbError;
        setAnggota(data);
      } catch (err) {
        setError("Gagal memuat data anggota — menampilkan data demo");
        setAnggota(DEMO_ANGGOTA);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnggota();
  }, []);

  return { anggota, loading, error };
}
