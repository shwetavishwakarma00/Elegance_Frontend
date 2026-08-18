"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    category_name: "",
    category_image: "",
    description: "",
  });
  const [productForm, setProductForm] = useState({
    product_name: "",
    product_image: "",
    price: "",
    material: "",
    category_id: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  const loadData = async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const [catRes, prodRes] = await Promise.all([
      fetch(`${apiBaseUrl}/categories`),
      fetch(`${apiBaseUrl}/products`),
    ]);
    const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
    setCategories(Array.isArray(catData) ? catData : []);
    setProducts(Array.isArray(prodData) ? prodData : []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitData = async (event, payload, reset) => {
    event.preventDefault();
    setMessage("");

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    try {
      const response = await fetch(`${apiBaseUrl}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save");
      setMessage(data.message || "Saved successfully");
      reset();
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editRecord = async (event, type, id, payload) => {
    event.preventDefault();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    try {
      const response = await fetch(`${apiBaseUrl}/admin/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update");
      setMessage(data.message);
      setEditingCategoryId(null);
      setEditingProductId(null);
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const beginCategoryEdit = (category) => {
    setEditingCategoryId(category.category_id);
    setCategoryForm({
      category_name: category.category_name || "",
      category_image: category.category_image || "",
      description: category.description || "",
    });
  };

  const beginProductEdit = (product) => {
    setEditingProductId(product.product_id);
    setProductForm({
      product_name: product.product_name || "",
      product_image: product.image_url || "",
      price: product.price || "",
      material: product.material || "",
      category_id: product.category_id || "",
      description: product.description || "",
    });
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

        <div className="grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={(event) => editingCategoryId
              ? editRecord(event, "category", editingCategoryId, categoryForm)
              : submitData(event, categoryForm, () => setCategoryForm({ category_name: "", category_image: "", description: "" }))}
            className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{editingCategoryId ? "Edit category" : "Add a category"}</h2>
            <p className="mt-2 text-sm text-gray-600">Create a category that will appear in the store and product selector.</p>
            <div className="mt-6 space-y-4">
              <input required name="category_name" value={categoryForm.category_name} onChange={(event) => setCategoryForm({ ...categoryForm, category_name: event.target.value })} placeholder="Category name" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" />
              <input name="category_image" value={categoryForm.category_image} onChange={(event) => setCategoryForm({ ...categoryForm, category_image: event.target.value })} placeholder="Category image URL" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" />
              <textarea name="description" value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} placeholder="Category description" rows="4" className="w-full rounded-[1.2rem] border border-[#d8c6a7] px-4 py-3" />
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700">{editingCategoryId ? "Update category" : "Add category"}</button>
              {editingCategoryId ? <button type="button" onClick={() => { setEditingCategoryId(null); setCategoryForm({ category_name: "", category_image: "", description: "" }); }} className="rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-700">Cancel</button> : null}
            </div>
          </form>

          <form
            onSubmit={(event) => editingProductId
              ? editRecord(event, "product", editingProductId, productForm)
              : submitData(event, productForm, () => setProductForm({ product_name: "", product_image: "", price: "", material: "", category_id: "", description: "" }))}
            className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{editingProductId ? "Edit product" : "Add a product"}</h2>
            <p className="mt-2 text-sm text-gray-600">Choose an existing category before publishing the product.</p>
            <div className="mt-6 space-y-4">
              <input required name="product_name" value={productForm.product_name} onChange={(event) => setProductForm({ ...productForm, product_name: event.target.value })} placeholder="Product name" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" />
              <select required name="category_id" value={productForm.category_id} onChange={(event) => setProductForm({ ...productForm, category_id: event.target.value })} className="w-full rounded-full border border-[#d8c6a7] bg-white px-4 py-3 text-gray-700">
                <option value="">Choose category</option>
                {categories.map((category) => <option key={category.category_id} value={category.category_id}>{category.category_name}</option>)}
              </select>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required type="number" min="0" step="0.01" name="price" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} placeholder="Price" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" />
                <input name="material" value={productForm.material} onChange={(event) => setProductForm({ ...productForm, material: event.target.value })} placeholder="Material" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" />
              </div>
              <input name="product_image" value={productForm.product_image} onChange={(event) => setProductForm({ ...productForm, product_image: event.target.value })} placeholder="Product image URL" className="w-full rounded-full border border-[#d8c6a7] px-4 py-3" />
              <textarea name="description" value={productForm.description || ""} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} placeholder="Product description" rows="4" className="w-full rounded-[1.2rem] border border-[#d8c6a7] px-4 py-3" />
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700">{editingProductId ? "Update product" : "Add product"}</button>
              {editingProductId ? <button type="button" onClick={() => { setEditingProductId(null); setProductForm({ product_name: "", product_image: "", price: "", material: "", category_id: "", description: "" }); }} className="rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-700">Cancel</button> : null}
            </div>
          </form>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Categories
            </h2>
            <div className="mt-4 space-y-3">
              {categories.map((category) => (
                <div key={category.category_id} className="rounded-[1rem] bg-[#faf6f1] p-4 text-sm text-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900">{category.category_name}</p>
                    <button type="button" onClick={() => beginCategoryEdit(category)} className="text-xs font-medium text-[#9d742b] hover:text-gray-900">Edit</button>
                  </div>
                  <p title={category.description} className="mt-1 line-clamp-2">{category.description}</p>
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
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p title={product.description} className="line-clamp-2">{product.description}</p>
                    <button type="button" onClick={() => beginProductEdit(product)} className="shrink-0 text-xs font-medium text-[#9d742b] hover:text-gray-900">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
