import type { Metadata, Viewport } from "next";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { brand } from "@/lib/brand";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0D0B",
};

export const metadata: Metadata = {
  title: `${brand.nameAr} | ${brand.nameEn}`,
  description: brand.bio.join(" — "),
  keywords: ["عطور", "وابل", "المرج", "عطور رجالي", "عطور حريمي", "نيش"],
  openGraph: {
    title: brand.nameAr,
    description: brand.tagline,
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${playfair.variable} font-arabic flex min-h-screen flex-col`}
      >
        <CartProvider>
          <Header />
          <main className="flex-1 animate-fade-in pb-safe">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
