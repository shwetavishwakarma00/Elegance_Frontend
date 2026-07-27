import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { category_name, description, product_name, price, material, category_id } = body;

    if (category_name) {
      const categoryResult = await query(
        `INSERT INTO categories (category_name, description, status) VALUES (?, ?, 1)`,
        [category_name, description || ""]
      );

      if (product_name) {
        const catId = category_id || categoryResult.insertId;
        await query(
          `INSERT INTO products (category_id, product_name, description, material, price, sku, status)
           VALUES (?, ?, ?, ?, ?, ?, 1)`,
          [catId, product_name, description || "", material || "", price || 0, `SKU-${Date.now()}`]
        );
      }
    } else if (product_name) {
      await query(
        `INSERT INTO products (category_id, product_name, description, material, price, sku, status)
         VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [category_id || null, product_name, description || "", material || "", price || 0, `SKU-${Date.now()}`]
      );
    }

    return Response.json({ success: true, message: "Saved successfully" });
  } catch (error) {
    return Response.json({ error: error.message || "Failed to save data" }, { status: 500 });
  }
}
