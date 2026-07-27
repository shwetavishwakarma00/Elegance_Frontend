import Image from "next/image";
import Link from "next/link";

const highlights = [
  {
    title: "Elevated Essentials",
    text: "Thoughtfully designed pieces that transition from day to evening with ease.",
  },
  {
    title: "Premium Craftsmanship",
    text: "Fine fabrics, flawless finishes, and details that feel unmistakably luxurious.",
  },
  {
    title: "Personal Styling",
    text: "Curated guidance to help you build a wardrobe that feels effortless and refined.",
  },
];

const testimonials = [
  {
    quote:
      "Every piece feels timeless. The collection is graceful, polished, and incredibly easy to wear.",
    name: "Maya Chen",
  },
  {
    quote:
      "The attention to detail is exceptional. It feels like shopping for a capsule wardrobe with soul.",
    name: "Sophia Alvarez",
  },
  {
    quote:
      "Elegant, modern, and truly special. I keep coming back for the refined finishing touches.",
    name: "Aisha Rao",
  },
];

export default function AdditionalSections() {
  return (
    <section className="w-full bg-[#fcf8f2] text-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[#e6d8c2] bg-[#f5ede3] p-8 shadow-sm md:p-10">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
              Signature Edit
            </p>
            <h3
              className="mb-5 text-3xl leading-tight text-gray-900 md:text-4xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              A wardrobe shaped by timeless femininity.
            </h3>
            <p className="mb-8 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              Discover refined silhouettes, rich textures, and statement pieces chosen to elevate everyday dressing with grace.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/collections/All"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Explore the Edit
              </Link>
              <Link
                href="/lookbook"
                className="rounded-full border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
              >
                Browse Lookbook
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[1.5rem] min-h-[260px]">
              <Image
                src="/img/dresses.jpg"
                alt="Luxury dresses"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-[11px] uppercase tracking-[0.25em]">Limited Release</p>
                <p className="mt-1 text-lg" style={{ fontFamily: "'Georgia', serif" }}>
                  Evening Grace
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-[1.5rem] border border-[#e4d4bf] bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">Why clients love us</p>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  A beautifully curated experience from first click to final fitting.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] min-h-[180px]">
                <Image
                  src="/img/coord-sets.jpg"
                  alt="Co-ord set styling"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[1.4rem] border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5ede3] text-lg text-[#c9a84c]">
                ✦
              </div>
              <h4 className="mb-2 text-lg text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                {item.title}
              </h4>
              <p className="text-sm leading-7 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
                Client Notes
              </p>
              <h3 className="mt-2 text-2xl text-gray-900 md:text-3xl" style={{ fontFamily: "'Georgia', serif" }}>
                Loved by women who value presence and polish.
              </h3>
            </div>
            <Link href="/collections/All" className="text-sm font-medium text-gray-700 transition hover:text-[#c9a84c]">
              View all favourites
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[1.2rem] bg-[#faf6f1] p-6">
                <p className="text-sm leading-7 text-gray-700">“{item.quote}”</p>
                <p className="mt-5 text-sm font-semibold text-gray-900">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-[#f5ede3] px-6 py-8 md:px-10 md:py-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
              Stay close to the collection
            </p>
            <h3 className="mt-2 text-2xl text-gray-900 md:text-3xl" style={{ fontFamily: "'Georgia', serif" }}>
              Join the inner circle for first access and private edits.
            </h3>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
            <input
              type="email"
              placeholder="Email address"
              className="min-w-[220px] rounded-full border border-[#d8c6a7] bg-white px-4 py-3 text-sm outline-none focus:border-[#c9a84c]"
            />
            <button className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#eadfce] bg-white/80 px-6 py-6 text-center text-sm text-gray-600 md:px-12">
        <p>© 2026 Elegance. Crafted for those who love timeless style.</p>
      </footer>
    </section>
  );
}
