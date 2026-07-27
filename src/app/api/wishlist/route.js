import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, product_id } = body;

    await query(
      `INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE product_id = product_id`,
      [user_id, product_id]
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to save wishlist item" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return Response.json([], { status: 200 });
    }

    const rows = await query(
      `SELECT w.wishlist_id, w.product_id, p.product_name, p.description, p.price, c.category_name
       FROM wishlist w
       LEFT JOIN products p ON w.product_id = p.product_id
       LEFT JOIN categories c ON p.category_id = c.category_id
       WHERE w.user_id = ?`,
      [userId]
    );

    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}
