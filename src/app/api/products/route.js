import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");

    let sql = `
      SELECT p.product_id, p.product_name, p.description, p.price, p.discount_price, p.material, p.rating,
             p.total_reviews, p.status, c.category_id, c.category_name,
             COALESCE(pi.image_url, '') AS image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
      WHERE p.status = 1
    `;

    const params = [];
    if (categoryId) {
      sql += " AND p.category_id = ?";
      params.push(categoryId);
    }

    sql += " ORDER BY p.created_at DESC";

    const rows = await query(sql, params);
    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
