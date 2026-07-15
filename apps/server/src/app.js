import authRoutes from "./routes/authRoutes.js";
import express from "express";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NeighbourhoodOS Backend is Running 🚀",
  });
});

export default app;