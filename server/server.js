const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes)

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