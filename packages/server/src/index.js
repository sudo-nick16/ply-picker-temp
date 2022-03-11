import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";
import SubCategoryRouter from "./routes/subCategoryRoutes.js";
import ProductRouter from "./routes/product.js";
import GroupRouter from "./routes/groupRoutes.js";
import SubGroupRouter from "./routes/subGroupRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URI, ORIGIN, PORT } from "./constants.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import delRouter from "./routes/deliveryRoutes.js";

const mongooseOptions = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  keepAliveInitialDelay: 300000,
};

mongoose.connect(MONGODB_URI, mongooseOptions).then(
  () => {
    console.log("Connected to MongoDB");
  },
  (err) => {
    console.log("Error connecting to MongoDB: ", err);
  }
);

mongoose.connection.on("error", (err) => {
  console.log(err);
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

app.use("/api", cors(corsOptions), SubGroupRouter);
app.use("/api", cors(corsOptions), GroupRouter);
app.use("/api", cors(corsOptions), CategoryRouter);
app.use("/api", cors(corsOptions), ProductRouter);
app.use("/api", cors(corsOptions), SubCategoryRouter);
app.use("/api", cors(corsOptions), userRoutes);
app.use("/api/carts", cors(corsOptions), cartRoutes);
// app.use("/api/products", cors(corsOptions), productRoutes);
app.use("/api/auth", cors(corsOptions), authRoutes);
app.use("/api/wishlist", cors(corsOptions), wishlistRouter);
app.use("/api/orders", cors(corsOptions), orderRouter);
app.use("/api/delivery/orders", cors(corsOptions), delRouter);

console.log(`Listening on port ${PORT}`);

app.listen(PORT || 4001, () => {
  console.log("To the moon.");
});
