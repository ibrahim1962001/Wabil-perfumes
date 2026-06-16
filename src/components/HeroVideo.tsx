"use client";

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal-dark">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-perfume.png"
        className="h-full w-full object-cover object-center"
        aria-label="وابل للعطور"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal-dark to-transparent" />
    </div>
  );
}
