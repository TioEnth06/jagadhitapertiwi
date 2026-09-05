import type { TagVariant } from "@/components/ui/Tag";

export const pinjamanStatusTag: Record<string, TagVariant> = {
  menunggu: "kuning",
  disetujui: "biru",
  ditolak: "merah",
  cair: "biru",
  lunas: "hijau",
};

export const pinjamanStatusLabel: Record<string, string> = {
  menunggu: "Menunggu",
  disetujui: "Disetujui",
  ditolak: "Ditolak",
  cair: "Berjalan",
  lunas: "Lunas",
};

export const loiStatusTag: Record<string, TagVariant> = {
  baru: "merah",
  dihubungi: "kuning",
  assigned: "biru",
  selesai: "hijau",
};

export const poStatusTag: Record<string, TagVariant> = {
  pending: "kuning",
  approved: "biru",
  selesai: "hijau",
  draft: "abu",
};

export function statusTagVariant(
  map: Record<string, TagVariant>,
  status: string,
  fallback: TagVariant = "abu",
): TagVariant {
  return map[status] ?? fallback;
}
