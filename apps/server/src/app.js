import express from "express";

import authRoutes from "./routes/authRoutes.js";
import neighbourhoodRoutes from "./routes/neighbourhoodRoutes.js";
import residentRoutes from "./routes/residentRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
const app = express();

// Middleware
app.use(express.json());

// ======================================================
// Routes
// ======================================================

app.use("/api/auth", authRoutes);
app.use("/api/neighbourhood", neighbourhoodRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/products", productRoutes);
// ======================================================
// Health Check
// ======================================================

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NeighbourhoodOS Backend is Running 🚀",
  });
});

export default app;