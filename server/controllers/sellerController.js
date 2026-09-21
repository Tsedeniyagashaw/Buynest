const User = require("../models/user");
const Orders = require("../models/Order");
const Product = require("../models/Product");

const getSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.user.id).select("-password");

    if (!seller) {
      return res.status(404).json({
        message: "Seller Not Found!!",
      });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSellerStats = async (req, res) => {
  try {
    const products = await Product.countDocuments({
      seller: req.user.id,
    });
    const sellerOrders = await Orders.find({
      "orderItems.seller": req.user.id,
    })
      .populate("user", "firstName lastName")
      .populate("orderItems.product");
    const pendingOrders = sellerOrders.filter((order) => order.status === "pending").length;

    const shippedOrders = sellerOrders.filter((order) => order.status === "shipped").length;

    const deliveredOrders = sellerOrders.filter((order) => order.status === "delivered").length;

    let revenue = 0;

    sellerOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.seller.toString() === req.user.id) {
          revenue += item.product.price * item.quantity;
        }
      });
    });

    const recentOrders = sellerOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    const recentProducts = await Product.find({
      seller: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const monthlySales = [
      {
        month: "Jan",
        sales: 0,
      },
      {
        month: "Feb",
        sales: 0,
      },
      {
        month: "Mar",
        sales: 0,
      },
      {
        month: "Apr",
        sales: 0,
      },
      {
        month: "May",
        sales: 0,
      },
      {
        month: "Jun",
        sales: 0,
      },
    ];

    res.json({
      products,

      orders: sellerOrders.length,

      revenue,

      pendingOrders,

      shippedOrders,

      deliveredOrders,

      orderStatus: {
        pending: pendingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
      },

      recentOrders,

      recentProducts,

      monthlySales,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getSellerProfile, getSellerStats };
