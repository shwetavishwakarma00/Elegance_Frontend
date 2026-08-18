import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.patch("/category/:id", async (req, res) => {
  try {
    const { category_name, category_image, description } = req.body;
    if (!String(category_name || "").trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }

    await pool.execute(
      `UPDATE categories SET category_name = ?, category_image = ?, description = ? WHERE category_id = ?`,
      [String(category_name).trim(), String(category_image || "").trim(), String(description || "").trim(), req.params.id]
    );
    return res.json({ success: true, message: "Category updated successfully" });
  } catch (error) {
    console.error("Failed to update category:", error.message);
    return res.status(500).json({ error: "Failed to update category" });
  }
});

router.patch("/product/:id", async (req, res) => {
  const { product_name, product_image, description, material, price, category_id } = req.body;
  if (!String(product_name || "").trim() || !category_id || Number.isNaN(Number(price))) {
    return res.status(400).json({ error: "Product name, category, and valid price are required" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(
      `UPDATE products SET product_name = ?, description = ?, material = ?, price = ?, category_id = ? WHERE product_id = ?`,
      [String(product_name).trim(), String(description || "").trim(), String(material || "").trim(), Number(price), Number(category_id), req.params.id]
    );

    const image = String(product_image || "").trim();
    const [existingImages] = await connection.execute(
      `SELECT product_id FROM product_images WHERE product_id = ? AND is_primary = 1 LIMIT 1`,
      [req.params.id]
    );
    if (existingImages.length && image) {
      await connection.execute(`UPDATE product_images SET image_url = ? WHERE product_id = ? AND is_primary = 1 LIMIT 1`, [image, req.params.id]);
    } else if (!existingImages.length && image) {
      await connection.execute(`INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, 1)`, [req.params.id, image]);
    }

    await connection.commit();
    return res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Failed to update product:", error.message);
    return res.status(500).json({ error: "Failed to update product" });
  } finally {
    connection.release();
  }
});

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
