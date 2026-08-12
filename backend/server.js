
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

console.log("Wishlist import successful");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/wishlist", wishlistRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
console.log("Express app initialized");
app.get("/", (req, res) => {
    res.send("🚀 Voyago Backend is Running");
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});