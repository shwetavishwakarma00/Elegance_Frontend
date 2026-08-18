import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT category_id, category_name, category_image, description, status
       FROM categories
       WHERE status = 1
       ORDER BY category_name ASC`
    );

    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch categories:", error.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

export default router;
