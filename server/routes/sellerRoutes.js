const { authorizeRoles } = require("../controllers/authController");
const { getSellerProfile, getSellerStats } = require("../controllers/sellerController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")


router.get("/profile",protect, authorizeRoles("seller"), getSellerProfile);
router.get( "/stats", protect, authorizeRoles("seller"), getSellerStats);

module.exports = router;