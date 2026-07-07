const { authorizeRoles } = require("../controllers/authController");
const { getSellerProfile } = require("../controllers/sellerController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")


router.get("/profile",protect, authorizeRoles("seller"), getSellerProfile);
module.exports = router;