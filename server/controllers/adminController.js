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


const getAdminProfile = async (req,res) => {
    try {
        const admin  = await User.findById(req.user.id).select("firstName lastName");

        if(!admin) {
            return res.status(404).json({ message: "Admin not Found"});
        }
        res.json(admin);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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

        if (!seller) {
            return res.status(404).json({
                message: "Seller not Found!"
            });
        }

        seller.isApproved = req.body.isApproved;

        await seller.save();

        res.json({
            message: seller.isApproved
                ? "Seller approved successfully"
                : "Seller approval revoked successfully",
            seller,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

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

const getAllSellers = async (req, res) => {
    try {
        const sellers = await User.find({ role: "seller" })
            .select("-password");

        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

const toggleUserBlock = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role === "admin") {
            return res.status(403).json({
                message: "Admins cannot be suspended"
            });
        }

        user.isBlocked = !user.isBlocked;

        await user.save();

        res.json({
            message: user.isBlocked
                ? "User suspended successfully"
                : "User activated successfully",
            user
        });

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const toggleProductStatus = async(req,res)=>{

    try{

        const product = await Product.findById(req.params.id);


        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }


        product.isActive = !product.isActive;


        await product.save();


        res.json({
            message: product.isActive
                ? "Product activated successfully"
                : "Product deactivated successfully",

            product
        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getAdminStats = async (req, res) => {
  try {
    const [
      users,
      products,
      orders,
      sellers,
      pendingSellers
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: "seller" }),
      User.countDocuments({ role: "seller", isApproved: false })
    ]);

    res.json({
      users,
      products,
      orders,
      sellers,
      pendingSellers
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



module.exports = { getAllUsers, getAdminProfile, getPendingSellers, approveSeller, 
    getAllOrders, getAllProducts, getAdminStats, deleteProductAdmin, getAllSellers, toggleUserBlock, toggleProductStatus };