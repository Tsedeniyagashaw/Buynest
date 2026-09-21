const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createReview, getProductReviews, updateReview, deleteReview} = require("../controllers/ReviewController");


router.post( "/", protect, authorizeRoles("buyer"), createReview );
router.get("/product/:id", getProductReviews);
router.put( "/:id", protect, authorizeRoles("buyer"), updateReview);
router.delete("/:id", protect, authorizeRoles("buyer"), deleteReview);


module.exports = router;