"use client";

import { useEffect, useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { brand } from "@/lib/brand";
import {
  formatReviewDate,
  getAllReviews,
  getAverageRating,
  saveCustomerReview,
} from "@/lib/reviews";
import type { Review } from "@/lib/types";

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (n: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className={`flex gap-0.5 ${sizeClass}`} role="group" aria-label="التقييم">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-transform duration-200 ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } ${star <= value ? "text-gold" : "text-white/20"}`}
          aria-label={`${star} نجوم`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="glass-card card-hover flex flex-col p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-white">{review.name}</p>
          <p className="text-[11px] text-white/40 sm:text-xs">
            {formatReviewDate(review.createdAt)}
          </p>
        </div>
        <StarRating value={review.rating} readonly size="sm" />
      </div>
      <p className="flex-1 text-sm leading-relaxed text-white/70">
        {review.comment}
      </p>
      {review.source === "customer" && (
        <span className="mt-3 w-fit rounded-full bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
          عميل
        </span>
      )}
    </article>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setReviews(getAllReviews());
  }, []);

  const average = getAverageRating(reviews);
  const total = reviews.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("اكتب اسمك (حرفين على الأقل)");
      return;
    }
    if (comment.trim().length < 10) {
      setError("اكتب رأيك (10 أحرف على الأقل)");
      return;
    }

    setSubmitting(true);
    saveCustomerReview({
      name: name.trim(),
      rating,
      comment: comment.trim(),
    });
    setReviews(getAllReviews());
    setName("");
    setComment("");
    setRating(5);
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="border-t border-white/5 bg-charcoal-light/20 section-padding">
      <div className="container-main">
        <AnimateIn className="mb-8 text-center sm:mb-10">
          <span className="badge-gold mb-3">آراء عملائنا</span>
          <h2 className="heading-section mb-2">إيه رأيك في وابل؟</h2>
          <p className="text-body mx-auto max-w-lg">
            شاركنا تجربتك — رأيك بيساعدنا ويساعد غيرك يختار العطر المناسب
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating value={Math.round(average)} readonly size="lg" />
              <span className="text-xl font-bold text-gold">{average}</span>
            </div>
            <span className="text-sm text-white/50">
              {total} رأي · {brand.stats.rating}% توصية على فيسبوك
            </span>
          </div>
        </AnimateIn>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <AnimateIn className="lg:col-span-2" delay={100}>
            <form
              onSubmit={handleSubmit}
              className="glass-card sticky top-24 space-y-4 p-5 sm:p-6 lg:top-28"
            >
              <h3 className="font-bold text-gold">أضف رأيك</h3>

              <div>
                <label className="mb-1.5 block text-sm text-white/60">
                  اسمك
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: أحمد م."
                  className="input-field"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-white/60">
                  تقييمك
                </label>
                <StarRating value={rating} onChange={setRating} size="lg" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-white/60">
                  رأيك
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="شاركنا تجربتك مع العطر أو الخدمة..."
                  rows={4}
                  className="input-field min-h-[120px] resize-none"
                  maxLength={500}
                />
                <p className="mt-1 text-left text-[11px] text-white/30" dir="ltr">
                  {comment.length}/500
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-400">
                  ✓ شكراً! رأيك اتضاف بنجاح
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {submitting ? "جاري الإرسال..." : "نشر الرأي"}
              </button>
            </form>
          </AnimateIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 xl:grid-cols-2">
            {reviews.map((review, i) => (
              <AnimateIn key={review.id} delay={(i % 4) * 60}>
                <ReviewCard review={review} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
