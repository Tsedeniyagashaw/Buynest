const Order = require("../models/Order");
const Cart = require("../models/Cart");



const createOrder = async(req, res) => {
try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
        return res.status(404).json({
            message: "There is nothing in the cart Yet!",
        });
    }

    let totalPrice = 0;
    cart.items.forEach((item)=>{
        totalPrice += item.product.price * item.quantity;
    });

    const order = await Order.create({
        user: req.user.id,

        orderItems: cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity
        })),
        totalPrice,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
}
catch(error){
    res.status(500).json({
        message: error.message,
    })
};}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,

        }).populate("orderItems.product");

        res.json(orders);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "firstName email")
        .populate("orderItems.product");

        const sellerOrders = orders.filter(order =>
    order.orderItems.some(
        item =>
            item.product &&
            item.product.seller.toString() === req.user.id
    )
);
        res.json(sellerOrders);
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = status;

        const updateOrder = await order.save();

        res.json(updateOrder);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    createOrder,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus

};