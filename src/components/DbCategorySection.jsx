"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DbCategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiBaseUrl}/categories`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch categories");
        }

        // The API should return an array, but never let an error object or
        // another response shape reach categories.map().
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setCategories([]);
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#fffaf4] px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl text-sm text-gray-600">Loading categories…</div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#fffaf4] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">Shop by category</p>
            <h3 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Curated categories from your database
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            These categories are fetched from the MySQL schema you shared and can be used to drive your collection pages.
          </p>
        </div>

        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-gray-600">No categories found.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.category_id}
                href={`/collections/${encodeURIComponent(category.category_name)}`}
                className="overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1"
              >
                <div className="h-48 w-full bg-[#f5ede3]" />
                <div className="p-5">
                  <h4 className="text-xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                    {category.category_name}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
