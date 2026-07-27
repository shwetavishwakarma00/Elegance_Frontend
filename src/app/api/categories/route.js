import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query(
      `SELECT category_id, category_name, category_image, description, status
       FROM categories
       WHERE status = 1
       ORDER BY category_name ASC`
    );

    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
