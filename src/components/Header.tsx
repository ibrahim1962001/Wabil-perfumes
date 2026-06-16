"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { brand } from "@/lib/brand";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/shop", label: "المتجر" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-charcoal-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt={brand.nameAr}
            width={48}
            height={48}
            className="rounded-full border border-gold/40"
          />
          <div className="hidden sm:block">
            <p className="font-display text-lg tracking-widest text-gold">
              W A B I L
            </p>
            <p className="text-sm text-white/70">{brand.nameAr}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-full border border-gold/30 px-4 py-2 text-sm text-gold transition hover:bg-gold/10"
          >
            السلة
            {totalItems > 0 && (
              <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${
              pathname === link.href
                ? "bg-gold/20 text-gold"
                : "text-white/60"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
