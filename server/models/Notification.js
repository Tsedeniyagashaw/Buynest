const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:true
    },

    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    },

    isRead:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);