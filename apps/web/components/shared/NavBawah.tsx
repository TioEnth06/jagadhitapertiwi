"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  CreditCard,
  ShoppingBasket,
  User,
  FileText,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

type NavVariant = "individu" | "b2b";

const individuMenu = [
  { href: "/dashboard", label: "Beranda", Icon: Home },
  { href: "/simpanan", label: "Simpanan", Icon: Wallet },
  { href: "/pinjaman", label: "Pinjaman", Icon: CreditCard },
  { href: "/marketplace", label: "Pasar", Icon: ShoppingBasket },
  { href: "/profil", label: "Akun", Icon: User },
];

const b2bMenu = [
  { href: "/b2b", label: "Beranda", Icon: Home },
  { href: "/b2b/po/buat", label: "Buat PO", Icon: FileText },
  { href: "/marketplace", label: "Pasar", Icon: ShoppingBasket },
  { href: "/b2b", label: "Laporan", Icon: BarChart3 },
  { href: "/profil", label: "Akun", Icon: Settings },
];

interface NavBawahProps {
  variant?: NavVariant;
}

export default function NavBawah({ variant = "individu" }: NavBawahProps) {
  const pathname = usePathname();
  const menu = variant === "b2b" ? b2bMenu : individuMenu;
  const activeColor = variant === "b2b" ? "text-biru bg-biru-muda" : "text-merah bg-merah-muda";
  const hoverColor = variant === "b2b" ? "hover:text-biru" : "hover:text-merah";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-abu-border bg-white">
      <div className="mx-auto flex h-16 max-w-[390px] items-center justify-around px-2">
        {menu.map(({ href, label, Icon }) => {
          const aktif = pathname === href || (href !== "/b2b" && (pathname?.startsWith(href) ?? false));
          return (
            <Link
              key={`${variant}-${href}-${label}`}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-colors ${
                aktif ? activeColor : `text-abu-teks ${hoverColor}`
              }`}
            >
              <Icon size={22} strokeWidth={aktif ? 2.5 : 1.8} />
              <span className="text-[11px] font-semibold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
