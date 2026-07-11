const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getPendingSellers,
  approveSeller,
  getAllOrders,
  getAllProducts,
  getAdminStats,
  deleteProductAdmin, getAdminProfile, getAllSellers, toggleUserBlock, toggleProductStatus
} = require("../controllers/adminController");

const { register } = require("../controllers/authController")

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/pending-sellers", protect, authorizeRoles("admin"), getPendingSellers);
router.get(
    "/sellers",
    protect,
    authorizeRoles("admin"),
    getAllSellers
);
router.put("/approve-seller/:id", protect, authorizeRoles("admin"), approveSeller);
router.get("/orders", protect, authorizeRoles("admin"), getAllOrders);
router.get("/products", protect, authorizeRoles("admin"), getAllProducts);
router.get("/stats", protect, authorizeRoles("admin"), getAdminStats);
router.delete("/products/:id", protect, authorizeRoles("admin"), deleteProductAdmin);
router.get("/profile", protect, authorizeRoles("admin"), getAdminProfile);
router.post("/create-admin",protect,authorizeRoles("admin"),register);
router.put(
    "/users/:id/block",
    protect,
    authorizeRoles("admin"),
    toggleUserBlock
);

router.put(
    "/products/:id/status",
    protect,
    authorizeRoles("admin"),
    toggleProductStatus
);
module.exports = router;