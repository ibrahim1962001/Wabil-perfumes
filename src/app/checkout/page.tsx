"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, getCartLineDetails } from "@/components/CartProvider";
import { brand, formatPrice } from "@/lib/brand";
import {
  allGovernorates,
  getShippingPrice,
  validateCoupon,
} from "@/lib/shipping";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const lines = getCartLineDetails(items);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("القاهرة");
  const [address, setAddress] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "vodafone" | "instapay">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const shipping = getShippingPrice(governorate, subtotal);
  const total = subtotal + shipping - discount;
  const isCairoFree =
    brand.freeCairoGovernorates.includes(
      governorate as (typeof brand.freeCairoGovernorates)[number]
    );
  const giftEligible = subtotal >= brand.promotion.minOrder;

  useEffect(() => {
    if (lines.length === 0 && !orderId) router.push("/cart");
  }, [lines.length, orderId, router]);

  const applyCoupon = () => {
    const result = validateCoupon(couponCode, subtotal);
    setDiscount(result.discount);
    setCouponMsg(result.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    setSubmitting(true);

    const id = `WBL-${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id,
      customerName: name,
      phone,
      governorate,
      address,
      items,
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("wabil-orders") ?? "[]");
    localStorage.setItem("wabil-orders", JSON.stringify([order, ...existing]));

    clearCart();
    setOrderId(id);
    setSubmitting(false);
  };

  if (orderId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <p className="mb-4 text-5xl">✅</p>
        <h1 className="mb-2 text-2xl font-bold text-gold">تم تأكيد طلبك!</h1>
        <p className="mb-2 text-white/70">رقم الطلب: {orderId}</p>
        <p className="mb-8 text-sm text-white/50">
          هنتواصل معاك على {phone} لتأكيد الطلب.{" "}
          {paymentMethod === "cod"
            ? "الدفع عند الاستلام."
            : paymentMethod === "vodafone"
              ? "الدفع بفودافون كاش."
              : "الدفع بـ Instapay."}
        </p>
        <Link href="/shop" className="text-gold hover:underline">
          متابعة التسوق
        </Link>
      </div>
    );
  }

  if (lines.length === 0 && !orderId) {
    return (
      <div className="px-4 py-20 text-center text-white/50">جاري التحويل...</div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold">إتمام الطلب</h1>
      <p className="mb-8 text-sm text-white/50">{brand.policies.preOrder}</p>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div>
            <label className="mb-1 block text-sm text-white/60">الاسم</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-charcoal-light px-4 py-3 outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">الموبايل</label>
            <input
              required
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01xxxxxxxxx"
              className="w-full rounded-xl border border-white/10 bg-charcoal-light px-4 py-3 text-right outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">المحافظة</label>
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-charcoal-light px-4 py-3 outline-none focus:border-gold"
            >
              {allGovernorates.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">العنوان بالتفصيل</label>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-charcoal-light px-4 py-3 outline-none focus:border-gold"
            />
          </div>

          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="كود الخصم"
              className="flex-1 rounded-xl border border-white/10 bg-charcoal-light px-4 py-3 outline-none focus:border-gold"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="rounded-xl border border-gold/40 px-4 text-gold hover:bg-gold/10"
            >
              تطبيق
            </button>
          </div>
          {couponMsg && (
            <p className={`text-sm ${discount > 0 ? "text-green-400" : "text-red-400"}`}>
              {couponMsg}
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm text-white/60">طريقة الدفع</label>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  { id: "cod", label: "💵 الدفع عند الاستلام", desc: "Cash عند الاستلام" },
                  { id: "vodafone", label: "📱 فودافون كاش", desc: "تحويل أثناء الطلب" },
                  { id: "instapay", label: "💳 Instapay", desc: "تحويل فوري" },
                ] as const
              ).map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`rounded-xl border p-4 text-right text-sm transition ${
                    paymentMethod === method.id
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 hover:border-gold/40"
                  }`}
                >
                  <p className="font-medium">{method.label}</p>
                  <p className="mt-1 text-xs opacity-70">{method.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-gold/20 bg-charcoal-light p-6">
            <h2 className="mb-4 font-bold">ملخص الطلب</h2>
            <ul className="mb-4 space-y-2 text-sm text-white/70">
              {lines.map(
                (l) =>
                  l && (
                    <li key={l.variantId} className="flex justify-between">
                      <span>
                        {l.product.nameAr} × {l.quantity}
                      </span>
                      <span>{formatPrice(l.lineTotal)}</span>
                    </li>
                  )
              )}
            </ul>
            <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-400">مجاني</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>خصم</span>
                  <span>− {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
            </div>

            {giftEligible && (
              <p className="mt-4 rounded-lg bg-gold/10 p-3 text-xs text-gold">
                🎁 مبروك! طلبك يستحق هدايا مجانية (عرض 1000 ج.م)
              </p>
            )}
            <p className="mt-4 rounded-lg border border-gold/30 bg-gold/5 p-3 text-xs text-gold">
              🎁 {brand.freeTesterPromo.subtitle}
            </p>
            {isCairoFree && shipping === 0 && (
              <p className="mt-2 text-xs text-green-400">
                ✓ {brand.policies.cairoShipping}
              </p>
            )}
            {!isCairoFree && subtotal >= brand.freeShippingThreshold && shipping === 0 && (
              <p className="mt-2 text-xs text-green-400">
                ✓ توصيل مجاني (الأوردر فوق {brand.freeShippingThreshold} ج.م)
              </p>
            )}
            {shipping > 0 && (
              <p className="mt-2 text-xs text-white/40">{brand.shippingNote}</p>
            )}

            <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm">
              <p className="mb-2 font-medium">طرق الدفع المتاحة</p>
              <ul className="space-y-1 text-white/50">
                {brand.paymentMethods.map((m) => (
                  <li key={m}>✓ {m}</li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-gold py-3 font-bold text-black transition hover:bg-gold-light disabled:opacity-50"
            >
              {submitting ? "جاري التأكيد..." : "تأكيد الطلب"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
