const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getAllUsers, getPendingSellers, approveSeller, getAllOrders } = require("../controllers/adminController");


router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/pending-sellers", protect, authorizeRoles("admin"), getPendingSellers);
router.put("/approve-seller/:id", protect, authorizeRoles("admin"), approveSeller);
router.get("/orders", protect, authorizeRoles("admin"), getAllOrders);
router.get("/admin/orders", protect, authorizeRoles("admin"), getAllOrders)

module.exports = router