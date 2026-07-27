import { query } from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const productId = params.id;
    const rows = await query(
      `SELECT p.product_id, p.product_name, p.description, p.price, p.discount_price, p.material, p.rating,
              p.total_reviews, p.status, c.category_id, c.category_name,
              COALESCE(pi.image_url, '') AS image_url
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.category_id
       LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
       WHERE p.product_id = ? AND p.status = 1
       LIMIT 1`,
      [productId]
    );

    if (rows.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(rows[0]);
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}
