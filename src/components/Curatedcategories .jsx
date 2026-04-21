"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Dresses",
    image: "/img/dresses.jpg",
    // href: "/collections/dresses",
  },
  {
    name: "Ethnic Wear",
    image: "/img/ethnic-wear.jpg",
    // href: "/collections/ethnic-wear",
  },
  {
    name: "Co-ord Sets",
    image: "/img/coord-sets.jpg",
    // href: "/collections/coord-sets",
  },
];

export default function CuratedCategories() {
  return (
    <section
      className="w-full py-14 px-6 md:px-14 lg:px-24"
      style={{ backgroundColor: "#faf6f1" }}
    >
      {/* Heading */}
      <div className="flex flex-col items-center mb-10">
        <h2
          className="text-2xl md:text-3xl font-normal text-gray-800 mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Curated Categories
        </h2>
        {/* Gold underline */}
        <span
          className="block w-10 h-[2px] rounded-full"
          style={{ backgroundColor: "#c9a84c" }}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.name}
            // href={cat.href}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
          >
            {/* Image */}
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Label */}
            <span
              className="absolute bottom-5 left-5 text-white text-base md:text-lg font-normal tracking-wide"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}