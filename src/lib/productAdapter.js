export function toStoreProduct(product) {
  return {
    ...product,
    id: product.product_id ?? product.id,
    name: product.product_name ?? product.name,
    image: product.image_url || product.image || "/img/dresses.jpg",
    category: product.category_name ?? product.category ?? "Collection",
    price: Number(product.price || 0),
  };
}
