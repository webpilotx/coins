import "dotenv/config";
import express from "express";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello !");
});

export default app;
