const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById, updateProduct, deleteProduct, getMyProducts, getNewProducts
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware")

router.get("/", getProducts);
router.get("/my-products", protect, authorizeRoles("seller"), getMyProducts);
router.get("/new",getNewProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, authorizeRoles("seller"), updateProduct);
router.delete("/:id", protect, authorizeRoles("seller"), deleteProduct);
router.post("/", protect, authorizeRoles("seller"), createProduct);

module.exports = router;