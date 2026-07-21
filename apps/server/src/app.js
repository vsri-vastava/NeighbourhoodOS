import express from "express";

import authRoutes from "./routes/authRoutes.js";
import neighbourhoodRoutes from "./routes/neighbourhoodRoutes.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/neighbourhood", neighbourhoodRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NeighbourhoodOS Backend is Running 🚀",
  });
});

export default app;