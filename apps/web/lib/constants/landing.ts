import { kontakPengurus } from '@/lib/data/mockData'

export const WHATSAPP_MESSAGE_DAFTAR = 'Halo saya ingin daftar Koperasi JDP'
export const WHATSAPP_MESSAGE_KORPORAT = 'Halo saya ingin mendaftar sebagai mitra korporat JDP'

function toWaNumber(telepon: string): string {
  const digits = telepon.replace(/\D/g, '')
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  if (digits.startsWith('62')) return digits
  return digits
}

export const WHATSAPP_NUMBER = toWaNumber(kontakPengurus.telepon)

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_URL_DAFTAR = buildWhatsAppUrl(WHATSAPP_MESSAGE_DAFTAR)
export const WHATSAPP_URL_KORPORAT = buildWhatsAppUrl(WHATSAPP_MESSAGE_KORPORAT)

export const LANDING_NAV_LINKS = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Bergabung', href: '#cara-kerja' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Untuk Perusahaan', href: '#korporat' },
] as const
