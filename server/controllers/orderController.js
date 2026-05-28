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


module.exports = {
    createOrder,
    getMyOrders

};