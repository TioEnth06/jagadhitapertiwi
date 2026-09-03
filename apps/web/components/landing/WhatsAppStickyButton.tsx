import { WHATSAPP_URL_DAFTAR } from '@/lib/constants/landing'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppStickyButton() {
  return (
    <a
      href={WHATSAPP_URL_DAFTAR}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[300] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white no-underline shadow-[0_4px_20px_rgba(37,211,102,0.4)] lg:hidden"
      aria-label="Daftar via WhatsApp"
    >
      <WhatsAppIcon size={20} />
      Daftar via WhatsApp
    </a>
  )
}
