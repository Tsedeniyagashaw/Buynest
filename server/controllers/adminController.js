const User = require("../models/user");
const Order = require("../models/Order");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    }
    catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getPendingSellers = async (req, res) => {
    try {
        const sellers = await User.find({
            role: "seller",
            isApproved: false
        }).select("-password");
        res.json(sellers);
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const approveSeller = async (req, res) => {
    try {
        const seller = await User.findById(req.params.id);

        if(!seller){
            return res.status(404).json({
                message: "Seller not Found!"
            });
        }
        seller.isApproved = true;
        await seller.save()

        res.json({
            message: "Seller approved successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllOrders =async (req, res) => {
    try{
        const orders = await Order.find()
        .populate("user", "firstName email")
        .populate("orderItems.product", "name");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = { getAllUsers, getPendingSellers, approveSeller, getAllOrders };