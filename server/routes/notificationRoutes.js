const express = require("express");
const router = express.Router();
const {protect}=require("../middleware/authMiddleware");
const {authorizeRoles}=require("../controllers/authController");
const { getNotifications, markAsRead }=require("../controllers/notificationController");

router.get("/", protect, authorizeRoles("seller"), getNotifications);
router.put("/:id/read",protect,authorizeRoles("seller"),markAsRead);

module.exports=router;