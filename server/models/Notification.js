const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // The user who receives this notification
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Used by frontend navigation
    type: {
      type: String,
      enum: [
        "seller",
        "feedback",
        "order"
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    // Only related to orders
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Notification",
  notificationSchema
);