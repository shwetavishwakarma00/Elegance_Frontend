"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const fallbackImages = ["/img/dresses.jpg", "/img/ethnic-wear.jpg", "/img/coord-sets.jpg"];

function getCategoryImage(category, index) {
  const image = typeof category.category_image === "string" ? category.category_image.trim() : "";

  if (!image) return fallbackImages[index % fallbackImages.length];
  if (/^(https?:|data:|blob:|\/)/i.test(image)) return image;

  return `/${image.replace(/^\.\//, "")}`;
}

export default function CuratedCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        if (!response.ok) throw new Error(data?.error || "Failed to fetch categories");
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }

    loadCategories();
  }, []);

  return (
    <section
      className="w-full py-14 px-6 md:px-14 lg:px-24"
      style={{ backgroundColor: "#faf6f1" }}
    >
      <div className="flex flex-col items-center mb-10">
        <h2
          className="text-2xl md:text-3xl font-normal text-gray-800 mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Curated Categories
        </h2>
        <span className="block w-10 h-[2px] rounded-full" style={{ backgroundColor: "#c9a84c" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category, index) => (
          <Link
            key={category.category_id}
            href={`/collections/${encodeURIComponent(category.category_name)}`}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getCategoryImage(category, index)}
              alt={category.category_name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackImages[index % fallbackImages.length];
              }}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span
              className="absolute bottom-5 left-5 text-white text-base md:text-lg font-normal tracking-wide"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {category.category_name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
