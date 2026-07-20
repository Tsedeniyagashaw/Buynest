const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seller",sellerRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reviews", reviewRoutes);



mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Api connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`running on ${PORT}`)
});