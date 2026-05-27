const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware")

const { addToCart, getCart} = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/",protect, getCart);

module.exports = router;