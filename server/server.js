const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Simple E-Commerce Server is Running...");
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});