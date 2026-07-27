export const products = [
  {
    id: 1,
    name: "Silk Wrap Dress",
    price: 12999,
    tag: "New Arrival",
    category: "Eveningwear",
    image: "/img/dresses.jpg",
    description:
      "A fluid silk wrap silhouette designed to move gracefully from cocktail hour to dinner dates.",
    features: ["Soft satin finish", "Adjustable drape", "Elegant midi length"],
  },
  {
    id: 2,
    name: "Pearl Tailored Set",
    price: 8999,
    tag: "Bestseller",
    category: "Tailoring",
    image: "/img/coord-sets.jpg",
    description:
      "Polished tailoring with a feminine edge, finished with sculptural pearl details.",
    features: ["Structured blazer", "Relaxed trousers", "Signature pearl accents"],
  },
  {
    id: 3,
    name: "Linen Evening Co-ord",
    price: 7499,
    tag: "Limited",
    category: "Resort",
    image: "/img/ethnic-wear.jpg",
    description:
      "Lightweight luxury made for warm evenings, with effortless layering and movement.",
    features: ["Breathable linen blend", "Relaxed fit", "Soft tonal palette"],
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}
