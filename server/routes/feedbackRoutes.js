const express = require("express");

const router = express.Router();

const {
    createFeedback,
    getAllFeedback,
    updateFeedbackStatus,
    deleteFeedback
} = require("../controllers/feedbackController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


// Buyer / Seller / Admin

router.post("/", protect, createFeedback);


// Admin only

router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getAllFeedback
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updateFeedbackStatus
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteFeedback
);


module.exports = router;