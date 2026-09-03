import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koperasi Jaga Dhita Pertiwi",
  description:
    "Platform digital koperasi petani — kelola simpanan, pinjaman, pasar produk tani, dan suara anggota dalam satu aplikasi.",
  openGraph: {
    title: "Koperasi Jaga Dhita Pertiwi",
    description: "Ekosistem ekonomi petani digital Indonesia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${playfair.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
