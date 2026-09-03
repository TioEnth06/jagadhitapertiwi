import { type Anggota } from "@/lib/hooks/useAnggota";
import { formatTanggal } from "@/lib/format";

export default function KartuAnggota({ anggota }: { anggota: Anggota }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden text-white select-none"
      style={{
        background: "linear-gradient(135deg, #990000 0%, #CC0000 60%, #DD2020 100%)",
        aspectRatio: "1.586 / 1", // rasio kartu kredit standar
      }}
    >
      {/* Noise texture subtle */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="relative p-5 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold opacity-75 tracking-wide uppercase">
              Koperasi Jaga Dhita Pertiwi
            </p>
            <p className="text-[10px] opacity-60 mt-0.5">Anggota Digital</p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                anggota.status === "aktif"
                  ? "bg-white/20 text-white"
                  : "bg-yellow-400/30 text-yellow-100"
              }`}
            >
              {anggota.status === "aktif" ? "✓ Aktif" : "Menunggu"}
            </div>
          </div>
        </div>

        {/* Nama & Nomor */}
        <div>
          <p className="text-xl font-bold tracking-wide uppercase leading-tight">
            {anggota.nama}
          </p>
          <p className="font-mono text-sm opacity-80 mt-1">{anggota.nomor_anggota}</p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] opacity-60">Bergabung sejak</p>
            <p className="text-[12px] font-semibold">{formatTanggal(anggota.bergabung_sejak)}</p>
          </div>
          <div className="text-2xl">🇮🇩</div>
        </div>
      </div>
    </div>
  );
}
