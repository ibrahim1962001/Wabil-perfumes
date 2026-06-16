import Link from "next/link";
import { brand, whatsappLink } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-charcoal-dark">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <h3 className="mb-3 font-display text-xl tracking-widest text-gold">
            W A B I L
          </h3>
          <p className="text-sm leading-relaxed text-white/60">
            {brand.bio[0]}
            <br />
            {brand.tagline} {brand.bio[3]}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-gold">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/shop" className="hover:text-gold">
                المتجر
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold">
                من نحن
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-gold">تواصل</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li dir="ltr" className="text-right">
              {brand.contact.phone}
            </li>
            <li>{brand.contact.email}</li>
            <li>
              {brand.location.area}، {brand.location.city}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-gold">تابعنا</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={brand.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-gold"
            >
              فيسبوك
            </a>
            <a
              href={`https://instagram.com/${brand.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-gold"
            >
              @{brand.contact.instagram}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-gold"
            >
              واتساب
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {brand.nameAr} — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
