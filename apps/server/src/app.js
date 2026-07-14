import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NeighbourhoodOS Backend is Running 🚀",
  });
});

export default app;