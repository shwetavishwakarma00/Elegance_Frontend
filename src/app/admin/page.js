"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    category_name: "",
    description: "",
    product_name: "",
    price: "",
    material: "",
    category_id: "",
  });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const [catRes, prodRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/products"),
    ]);
    const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
    setCategories(Array.isArray(catData) ? catData : []);
    setProducts(Array.isArray(prodData) ? prodData : []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      category_name: form.category_name,
      description: form.description,
      product_name: form.product_name,
      price: form.price,
      material: form.material,
      category_id: form.category_id,
    };

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save");
      setMessage(data.message || "Saved successfully");
      setForm({
        category_name: "",
        description: "",
        product_name: "",
        price: "",
        material: "",
        category_id: "",
      });
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">Admin panel</p>
          <h1 className="mt-2 text-3xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
            Manage categories and products
          </h1>
        </div>

        {message ? (
          <div className="mb-6 rounded-[1rem] border border-[#eadfce] bg-white p-4 text-sm text-gray-700">
            {message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="category_name"
              value={form.category_name}
              onChange={handleChange}
              placeholder="Category name"
              className="rounded-full border border-[#d8c6a7] px-4 py-3"
            />
            <input
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              placeholder="Category ID for product"
              className="rounded-full border border-[#d8c6a7] px-4 py-3"
            />
            <input
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              placeholder="Product name"
              className="rounded-full border border-[#d8c6a7] px-4 py-3"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="rounded-full border border-[#d8c6a7] px-4 py-3"
            />
            <input
              name="material"
              value={form.material}
              onChange={handleChange}
              placeholder="Material"
              className="rounded-full border border-[#d8c6a7] px-4 py-3"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="rounded-[1.2rem] border border-[#d8c6a7] px-4 py-3 md:col-span-2"
            />
          </div>
          <button type="submit" className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
            Save category & product
          </button>
        </form>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Categories
            </h2>
            <div className="mt-4 space-y-3">
              {categories.map((category) => (
                <div key={category.category_id} className="rounded-[1rem] bg-[#faf6f1] p-4 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">{category.category_name}</p>
                  <p className="mt-1">{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Products
            </h2>
            <div className="mt-4 space-y-3">
              {products.map((product) => (
                <div key={product.product_id} className="rounded-[1rem] bg-[#faf6f1] p-4 text-sm text-gray-700">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900">{product.product_name}</p>
                    <span>₹{product.price}</span>
                  </div>
                  <p className="mt-1">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
