import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const [productRows] = await pool.execute(
      `SELECT p.product_id, p.product_name, p.description, p.price, p.discount_price,
              p.material, p.rating, p.total_reviews, p.status,
              c.category_id, c.category_name,
              COALESCE(pi.image_url, '') AS image_url
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.category_id
       LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
       WHERE p.product_id = ? AND p.status = 1
       LIMIT 1`,
      [req.params.id]
    );

    if (!productRows.length) return res.status(404).json({ error: "Product not found" });

    const product = productRows[0];
    const [related] = await pool.execute(
      `SELECT p.product_id, p.product_name, p.description, p.price, p.discount_price,
              p.material, p.rating, p.total_reviews, c.category_name,
              COALESCE(pi.image_url, '') AS image_url
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.category_id
       LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
       WHERE p.status = 1 AND p.category_id = ? AND p.product_id <> ?
       ORDER BY p.created_at DESC
       LIMIT 4`,
      [product.category_id, req.params.id]
    );

    return res.json({ product, related });
  } catch (error) {
    console.error("Failed to fetch product details:", error.message);
    return res.status(500).json({ error: "Failed to fetch product details" });
  }
});

router.get("/", async (req, res) => {
  try {
    const categoryName = String(req.query.category_name || "").trim();
    const categoryId = String(req.query.category_id || "").trim();

    let sql = `
      SELECT p.product_id, p.product_name, p.description, p.price, p.discount_price,
             p.material, p.rating, p.total_reviews, p.status,
             c.category_id, c.category_name,
             COALESCE(pi.image_url, '') AS image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
      WHERE p.status = 1`;
    const params = [];

    if (categoryName && categoryName.toLowerCase() !== "all") {
      sql += " AND c.category_name = ?";
      params.push(categoryName);
    } else if (categoryId) {
      sql += " AND p.category_id = ?";
      params.push(categoryId);
    }

    sql += " ORDER BY p.created_at DESC";
    const [rows] = await pool.execute(sql, params);
    return res.json(rows);
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
