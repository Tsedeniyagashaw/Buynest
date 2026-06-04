const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById, updateProduct, deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware")

router.get("/", getProducts)
router.get("/:id", getProductById)
router.get("/my-products", protect, authorizeRoles("seller"), getProducts);
router.put("/:id", protect, authorizeRoles("seller"), updateProduct);
router.delete("/:id", protect, authorizeRoles("seller", deleteProduct))


router.post("/", protect, authorizeRoles("seller"), createProduct);

module.exports = router;