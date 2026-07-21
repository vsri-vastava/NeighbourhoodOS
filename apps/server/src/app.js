import express from "express";

import authRoutes from "./routes/authRoutes.js";
import neighbourhoodRoutes from "./routes/neighbourhoodRoutes.js";
import residentRoutes from "./routes/residentRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// ======================================================
// Routes
// ======================================================

app.use("/api/auth", authRoutes);
app.use("/api/neighbourhood", neighbourhoodRoutes);
app.use("/api/residents", residentRoutes);

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