import Link from "next/link";
import { brand, whatsappLink } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-charcoal-dark">
      <div className="container-main grid gap-8 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div>
          <h3 className="mb-3 font-display text-lg tracking-widest text-gold sm:text-xl">
            W A B I L
          </h3>
          <p className="text-sm leading-relaxed text-white/60">
            {brand.bio[0]}
            <br />
            {brand.tagline}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-gold sm:text-base">
            روابط سريعة
          </h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            {[
              { href: "/shop", label: "المتجر" },
              { href: "/about", label: "من نحن" },
              { href: "/contact", label: "تواصل معنا" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block min-h-[36px] leading-9 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-gold sm:text-base">
            تواصل
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li dir="ltr" className="text-right">
              {brand.contact.phone}
            </li>
            <li className="break-all">{brand.contact.email}</li>
            <li>
              {brand.location.area}، {brand.location.city}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-gold sm:text-base">
            تابعنا
          </h4>
          <div className="flex flex-col gap-2.5 text-sm">
            {[
              { href: brand.contact.facebook, label: "فيسبوك" },
              {
                href: `https://instagram.com/${brand.contact.instagram}`,
                label: `@${brand.contact.instagram}`,
              },
              { href: whatsappLink(), label: "واتساب" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block min-h-[36px] leading-9 text-white/60 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {brand.nameAr} — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
