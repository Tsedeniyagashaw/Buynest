const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware")

const { createOrder, getMyOrders, getSellerOrders, updateOrderStatus} = require("../controllers/orderController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { route } = require("./productRoutes");

router.post("/", protect, createOrder);

router.get("/",protect,getMyOrders);
router.get("/seller", protect, authorizeRoles("seller"), getSellerOrders);
router.put("/seller/:id/status", protect, authorizeRoles("seller"), updateOrderStatus)

module.exports = router