import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import { ORIGIN, PORT } from "./constants.js";

mongoose.connect("mongodb://localhost:27017/plypicker", () => {
  console.log("Connected to MongoDB");
});

const app = express();
const corsOptions = {
  origin: ORIGIN,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Hello boi!");
});

app.use("/api/auth",cors(corsOptions), authRoutes);

console.log(`Listening on port ${PORT}`);

app.listen(PORT || 4001, () => {
  console.log("To the moon.");
});
