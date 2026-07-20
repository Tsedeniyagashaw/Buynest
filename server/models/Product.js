const mongoose = require("mongoose")


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required:true
        },
        image: {
            type: String,
            required: true
        },
        category: {
    type: String,
    required: true
},
isActive: {
  type: Boolean,
  default: true
},
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        averageRating: {
    type: Number,
    default: 0
},

numReviews: {
    type: Number,
    default: 0
}
    },
    
    
   { timestamps : true }
);

module.exports = mongoose.model("Product", productSchema)