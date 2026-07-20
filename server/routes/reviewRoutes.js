const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");


// Buyer only
router.post(
    "/",
    protect,
    authorizeRoles("buyer"),
    createReview
);


// Public
router.get(
    "/product/:id",
    getProductReviews
);


// Buyer only
router.put(
    "/:id",
    protect,
    authorizeRoles("buyer"),
    updateReview
);


// Buyer only
router.delete(
    "/:id",
    protect,
    authorizeRoles("buyer"),
    deleteReview
);


module.exports = router;