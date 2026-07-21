const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");



const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
  .populate("items.product", "name price seller category image");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "There is nothing in the cart Yet!",
      });
    }

    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
const buyer = await User.findById(req.user.id);
    const order = await Order.create({
      user: req.user.id,

      orderItems: cart.items.map((item) => ({
    product: item.product._id,
    seller: item.product.seller,

    // Snapshot
    name: item.product.name,
    price: item.product.price,
    image: item.product.image || "",
    category: item.product.category || "",

    quantity: item.quantity,
})),

      totalPrice,
    });
    const Notification = require("../models/Notification");

for (const item of cart.items) {
  await Notification.create({
    user: item.product.seller,
    order: order._id,
    message: `New order is placed for "${item.product.name}"`,
  });
}

    cart.items = [];
    await cart.save();
    console.log(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
    try {
        // const orders = await Order.find({
        //     user: req.user.id,

        // }).populate("orderItems.product");
const orders = await Order.find({
    user: req.user.id
});

        res.json(orders);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

// const getSellerOrders = async (req, res) => {
//     try {
//         const orders = await Order.find()
//         .populate("user", "firstName email")
//         .populate("orderItems.product");

//         const sellerOrders = orders.filter(order =>
//     order.orderItems.some(
//         item =>
//             item.product &&
//             item.product.seller.toString() === req.user.id
//     )
// );
//         res.json(sellerOrders);
//     }
//     catch(error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }

// const updateOrderStatus = async (req, res) => {
//     try {
//         const { status } = req.body;

//        const order = await Order.findById(req.params.id)
//     .populate("orderItems.product"); 
//     if(!order) {
//             return res.status(404).json({
//                 message: "Order not found"
//             });
//         }

// const ownsProduct = order.orderItems.some(
//     item =>
//         item.product &&
//         item.product.seller.toString() === req.user.id
// );

// if (!ownsProduct) {
//     return res.status(403).json({
//         message: "Not authorized"
//     });
// }

       
//         const allowedStatuses = [
//     "pending",
//     "paid",
//     "shipped",
//     "delivered"
// ];

// if (!allowedStatuses.includes(status)) {
//     return res.status(400).json({
//         message: "Invalid status"
//     });
// }

//         order.status = status;

//         const updatedOrder = await order.save();

//         res.json(updatedOrder);
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// }




const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    // Return populated order
    const updatedOrder = await Order.findById(order._id)
      .populate("user", "firstName lastName email")
      .populate("orderItems.product");

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "orderItems.seller": req.user.id,
    })
      .populate("user", "firstName email")
      .populate("orderItems.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const orders = await Order.find({
      "orderItems.seller": sellerId,
    }).populate("orderItems.product");

    let totalRevenue = 0;
    let totalOrders = orders.length;

    let statusCount = {
      pending: 0,
      paid: 0,
      shipped: 0,
      delivered: 0,
    };

    let productMap = {};

    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.seller.toString() === sellerId) {
          const amount = item.product.price * item.quantity;

          totalRevenue += amount;

          statusCount[order.status]++;

          const name = item.product.name;

          productMap[name] = (productMap[name] || 0) + item.quantity;
        }
      });
    });

    const topProducts = Object.entries(productMap)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    res.json({
      totalRevenue,
      totalOrders,
      statusCount,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSellerAnalytics };





module.exports = {
    createOrder,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus,
    // getSellerStats,
    getSellerAnalytics

};