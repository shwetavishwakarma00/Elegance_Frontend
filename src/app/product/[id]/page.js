import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import ProductActions from "@/components/ProductActions";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export default function ProductPage({ params }) {
  const product = getProductById(params.id);

  if (!product) notFound();

  return (
    <main className="bg-[#fcf8f2] min-h-screen px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-8 inline-flex text-sm text-gray-700 hover:text-[#c9a84c]">
          ← Back to home
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#e7d9c4] bg-white">
            <Image src={product.image} alt={product.name} width={900} height={1100} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c]">{product.tag}</p>
            <h1 className="mt-3 text-4xl text-gray-900 md:text-5xl" style={{ fontFamily: "'Georgia', serif" }}>
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">{product.description}</p>

            <div className="mt-6 rounded-[1.25rem] border border-[#eadfce] bg-white p-5">
              <p className="text-sm text-gray-500">Category</p>
              <p className="mt-2 text-lg text-gray-900">{product.category}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Highlights</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-[1.25rem] border border-[#eadfce] bg-white p-5">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-semibold text-gray-900">₹{product.price}</p>
              </div>
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
