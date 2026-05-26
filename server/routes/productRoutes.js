const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware")

router.get("/", getProducts)
router.get("/:id", getProductById)


router.post("/", protect, authorizeRoles("seller"), createProduct);

module.exports = router;