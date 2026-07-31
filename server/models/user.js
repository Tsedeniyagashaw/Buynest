const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        }, 
        middleName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email:
        {
          type: String,
          required: true,
          unique: true

        },
        phoneNumber: {
            type: String,
            required: true
        },
         password: 
        {
           type: String,
             default:null
        },
        role: {
            type: String,
            enum: ["buyer", "seller", "admin"],
            default: "buyer"
        },
        isApproved:{
            type: Boolean,
            default: false
        },
        isBlocked: {
    type: Boolean,
    default: false
}

    },
    {timestamps: true}
);

module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);