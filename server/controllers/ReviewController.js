const Review = require("../models/Review");
const Order = require("../models/Order");
const Product = require("../models/Product");



const updateProductRating = async(productId)=>{

    const reviews = await Review.find({
        product: productId
    });


    const totalReviews = reviews.length;


    const average =
        totalReviews === 0
        ? 0
        : reviews.reduce(
            (sum, review)=> sum + review.rating,
            0
          ) / totalReviews;


    await Product.findByIdAndUpdate(
        productId,
        {
            averageRating: Number(average.toFixed(1)),
            numReviews: totalReviews
        }
    );

};
// =========================
// Create Review
// =========================

const createReview = async (req, res) => {

    try {

        const { product, order, rating, comment } = req.body;


        // Check that the order exists
        const existingOrder = await Order.findById(order);

        if (!existingOrder) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        // Make sure the order belongs to the logged-in buyer
        if (existingOrder.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You can only review your own orders."
            });

        }


        // Order must be delivered
        if (existingOrder.status !== "delivered") {

            return res.status(400).json({
                message: "You can only review delivered products."
            });

        }


        // Check if this product exists in the order
        const purchased = existingOrder.orderItems.some(
            item => item.product.toString() === product
        );

        if (!purchased) {

            return res.status(400).json({
                message: "This product was not purchased in this order."
            });

        }


        // Prevent duplicate review
       const alreadyReviewed = await Review.findOne({
    user: req.user.id,
    product
});

        if (alreadyReviewed) {

            return res.status(400).json({
                message: "You have already reviewed this product."
            });

        }


        const review = await Review.create({

            product,
            order,
            user: req.user.id,
            rating,
            comment

        });
        await updateProductRating(product);


        res.status(201).json({

            message: "Review submitted successfully.",
            review

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// =========================
// Get Product Reviews
// =========================

const getProductReviews = async (req, res) => {

    try {

        const reviews = await Review.find({

            product: req.params.id

        })
        .populate("user", "firstName lastName")
        .sort({ createdAt: -1 });


        res.json(reviews);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Update Review
// =========================

const updateReview = async (req, res) => {

    try {

        const { rating, comment } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({
                message: "Review not found"
            });

        }


        if (review.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }


        review.rating = rating;
        review.comment = comment;

        await review.save();
        await updateProductRating(review.product);

        const updatedReview = await Review.findById(review._id)
.populate("user","firstName lastName");


res.json({
    message:"Review updated successfully.",
    review: updatedReview
});

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =========================
// Delete Review
// =========================

const deleteReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({
                message: "Review not found"
            });

        }


        if (review.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }

        const productId = review.product;


        await review.deleteOne();


        await updateProductRating(productId);

        res.json({

            message: "Review deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
};