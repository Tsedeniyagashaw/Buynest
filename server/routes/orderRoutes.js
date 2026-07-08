const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware")

const { createOrder, getMyOrders, getSellerOrders, updateOrderStatus,  getSellerAnalytics} = require("../controllers/orderController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { route } = require("./productRoutes");

router.post("/", protect, createOrder);

router.get("/",protect,getMyOrders);
router.get("/seller/orders", protect, authorizeRoles("seller"), getSellerOrders);

router.get("/seller/analytics",protect,authorizeRoles("seller"),getSellerAnalytics
);
router.put("/seller/:id/status", protect, authorizeRoles("seller"), updateOrderStatus);
// router.get("/seller/stats", protect, authorizeRoles("seller"),getSellerStats);


module.exports = router