"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold/25 bg-charcoal-dark/98 shadow-card backdrop-blur-lg"
            : "border-b border-gold/10 bg-charcoal-dark/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3"
          >
            <Image
              src="/images/logo.jpg"
              alt={brand.nameAr}
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-full border border-gold/40 sm:h-12 sm:w-12"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-sm tracking-[0.2em] text-gold sm:text-lg sm:tracking-widest">
                W A B I L
              </p>
              <p className="truncate text-xs text-white/60 sm:text-sm">
                {brand.nameAr}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-all duration-300 hover:text-gold ${
                  pathname === link.href
                    ? "bg-gold/10 text-gold"
                    : "text-white/75"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gold/30 px-3 text-sm text-gold transition-all duration-300 hover:bg-gold/10 hover:shadow-gold sm:px-4"
            >
              <span className="hidden sm:inline">السلة</span>
              <span className="sm:hidden" aria-hidden>
                🛒
              </span>
              {totalItems > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 w-5 animate-cart-bounce items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 transition-colors hover:border-gold/40 lg:hidden"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-gold transition-all duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-gold transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-gold transition-all duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}

      <nav
        className={`fixed inset-x-0 top-[65px] z-40 border-b border-gold/20 bg-charcoal-dark/98 px-4 py-4 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <ul className="space-y-1">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className="animate-slide-down"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Link
                href={link.href}
                className={`flex min-h-[48px] items-center rounded-xl px-4 text-base transition-colors ${
                  pathname === link.href
                    ? "bg-gold/15 font-medium text-gold"
                    : "text-white/80 hover:bg-white/5 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
