import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.post("/", async (req, res) => {
  const {
    category_name,
    category_image,
    description,
    product_name,
    product_image,
    price,
    material,
    category_id,
  } = req.body;

  const categoryName = String(category_name || "").trim();
  const productName = String(product_name || "").trim();

  if (!categoryName && !productName) {
    return res.status(400).json({ error: "Add a category name or product name" });
  }

  if (productName && (price === "" || price === undefined || Number.isNaN(Number(price)))) {
    return res.status(400).json({ error: "A valid product price is required" });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let productCategoryId = category_id ? Number(category_id) : null;

    if (categoryName) {
      const [categoryResult] = await connection.execute(
        `INSERT INTO categories (category_name, category_image, description, status)
         VALUES (?, ?, ?, 1)`,
        [categoryName, String(category_image || "").trim(), String(description || "").trim()]
      );
      productCategoryId = categoryResult.insertId;
    }

    if (productName) {
      const [productResult] = await connection.execute(
        `INSERT INTO products (category_id, product_name, description, material, price, sku, status)
         VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [
          productCategoryId,
          productName,
          String(description || "").trim(),
          String(material || "").trim(),
          Number(price),
          `SKU-${Date.now()}`,
        ]
      );

      const productImage = String(product_image || "").trim();
      if (productImage) {
        await connection.execute(
          `INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, 1)`,
          [productResult.insertId, productImage]
        );
      }
    }

    await connection.commit();
    return res.status(201).json({ success: true, message: "Saved successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Failed to save admin data:", error.message);
    return res.status(500).json({ error: "Failed to save data" });
  } finally {
    connection.release();
  }
});

export default router;
