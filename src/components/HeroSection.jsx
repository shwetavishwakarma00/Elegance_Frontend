"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden flex items-center"
      style={{ backgroundColor: "#f5ede3" }}
    >
      <div className="absolute inset-0 flex justify-center md:justify-end">
        <div className="relative w-full h-full">
          
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/img/herosection_video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #f5ede3 10%, rgba(245,237,227,0.7) 20%, transparent 80%)",
            }}
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl py-16">
        {/* Season tag */}
        <p
          className="text-[11px] tracking-[0.25em] font-semibold mb-6 uppercase"
          style={{ color: "#c9a84c", fontFamily: "'Georgia', serif" }}
        >
          Spring Summer 2024
        </p>

        {/* Headline */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-normal text-gray-900 mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Where <em className="italic font-normal">Elegance</em>
          <br />
          Meets Style
        </h1>

        {/* Subtext */}
        <p
          className="text-sm md:text-base text-gray-600 leading-relaxed mb-10 max-w-xs md:max-w-sm"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Discover our curated collection of premium pieces designed for the
          modern woman who values timeless sophistication.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/collections"
            className="inline-block px-7 py-3.5 rounded-full bg-gray-900 text-white text-sm tracking-wide font-medium hover:bg-gray-700 transition-colors duration-200"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Shop Collection
          </Link>
          <Link
            href="/lookbook"
            className="inline-block px-7 py-3.5 rounded-full border border-gray-900 text-gray-900 text-sm tracking-wide font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200 text-center"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            View
            <br className="md:hidden" /> Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
