import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories.js";

// Reuse the existing local database settings in the frontend project.
dotenv.config({ path: "../.env.local" });

const app = express();
const port = Number(process.env.API_PORT || 5000);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Elegance API running at http://localhost:${port}`);
});
