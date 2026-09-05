"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/ui/TopBar";
import Btn from "@/components/ui/Btn";
import FormGroup from "@/components/ui/FormGroup";
import Input from "@/components/ui/Input";
import DemoToast from "@/components/ui/DemoToast";
import SectionLabel from "@/components/shared/SectionLabel";
import { useAdminStore } from "@/lib/stores/useAdminStore";
import { useDemoToast } from "@/lib/hooks/useDemoToast";

export default function LoiPage() {
  const submitLoi = useAdminStore((s) => s.submitLoi);
  const { message, showToast, dismiss } = useDemoToast();
  const [form, setForm] = useState({
    perusahaan: "",
    kontak: "",
    telepon: "",
    produk: "",
    volume: "",
    lokasi: "",
    tanggalButuh: "",
    catatan: "",
  });

  const update = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loi = submitLoi({ ...form, sumber: "form" });
    showToast(`LOI ${loi.ref} berhasil dikirim! Tim kami akan menghubungi Anda.`);
    setForm({
      perusahaan: "",
      kontak: "",
      telepon: "",
      produk: "",
      volume: "",
      lokasi: "",
      tanggalButuh: "",
      catatan: "",
    });
  };

  return (
    <div className="pb-6">
      <TopBar title="Letter of Intent (LOI)" backHref="/marketplace" />

      <div className="app-content space-y-6">
        <p className="text-sm leading-relaxed text-abu-teks">
          Formulir permintaan pasokan besar untuk korporat dan pembeli grosir. Data akan masuk ke
          inbox admin koperasi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section>
            <SectionLabel title="Data Perusahaan" className="mb-3" />
            <div className="app-form-card space-y-4">
              <FormGroup label="Nama Perusahaan" htmlFor="perusahaan">
                <Input
                  id="perusahaan"
                  value={form.perusahaan}
                  onChange={(e) => update("perusahaan", e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Nama Kontak" htmlFor="kontak">
                <Input
                  id="kontak"
                  value={form.kontak}
                  onChange={(e) => update("kontak", e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Telepon / WhatsApp" htmlFor="telepon">
                <Input
                  id="telepon"
                  value={form.telepon}
                  onChange={(e) => update("telepon", e.target.value)}
                  required
                />
              </FormGroup>
            </div>
          </section>

          <section>
            <SectionLabel title="Kebutuhan Pasokan" className="mb-3" />
            <div className="app-form-card space-y-4">
              <FormGroup label="Produk Dibutuhkan" htmlFor="produk">
                <Input
                  id="produk"
                  value={form.produk}
                  onChange={(e) => update("produk", e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Volume / Kebutuhan" htmlFor="volume">
                <Input
                  id="volume"
                  value={form.volume}
                  onChange={(e) => update("volume", e.target.value)}
                  placeholder="Contoh: 5 ton/bulan"
                  required
                />
              </FormGroup>
              <FormGroup label="Lokasi Pengiriman" htmlFor="lokasi">
                <Input
                  id="lokasi"
                  value={form.lokasi}
                  onChange={(e) => update("lokasi", e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Tanggal Dibutuhkan" htmlFor="tanggalButuh">
                <Input
                  id="tanggalButuh"
                  type="date"
                  value={form.tanggalButuh}
                  onChange={(e) => update("tanggalButuh", e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Catatan (opsional)" htmlFor="catatan">
                <textarea
                  id="catatan"
                  className="input min-h-[80px] resize-none"
                  value={form.catatan}
                  onChange={(e) => update("catatan", e.target.value)}
                />
              </FormGroup>
            </div>
          </section>

          <Btn type="submit">Kirim LOI</Btn>
        </form>

        <Link href="/" className="app-link-muted">
          ← Kembali ke landing
        </Link>
      </div>
      <DemoToast message={message} onDismiss={dismiss} />
    </div>
  );
}
