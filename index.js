import "dotenv/config";
import express from "express";
import app from "./api.js";

const PORT = process.env.PORT || 3000;
app.use("/coins", express.static("dist"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
