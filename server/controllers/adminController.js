const User = require("../models/user");
const Order = require("../models/Order");
const Product = require("../models/Product");

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

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        .populate("seller", "email role");
    
        res.json(products);
    }
    catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteProductAdmin = async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "product not found!"
            });
        }
        await product.deleteOne();

        res.json({
            message: "Product deleted successfully!"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAdminStats  = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const products = await Product.countDocuments();
        const orders = await Orders.countDocuments();
        const pendingSellers = await User.countDocuments({
            role: "seller",
            isApproved: false
        });

        res.json({
            users,products, orders, pendingSellers
        })


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = { getAllUsers, getPendingSellers, approveSeller, getAllOrders, getAllProducts, getAdminStats, deleteProductAdmin };