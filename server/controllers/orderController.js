const Order = require("../models/Order");
const Cart = require("../models/Cart");



const createOrder = async(req, res) => {
try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({
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

       const order = await Order.findById(req.params.id)
    .populate("orderItems.product"); 
    if(!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

const ownsProduct = order.orderItems.some(
    item =>
        item.product &&
        item.product.seller.toString() === req.user.id
);

if (!ownsProduct) {
    return res.status(403).json({
        message: "Not authorized"
    });
}

       
        const allowedStatuses = [
    "pending",
    "paid",
    "shipped",
    "delivered"
];

if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
        message: "Invalid status"
    });
}

        order.status = status;

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getSellerStats = async (req, res) => {
    try {
        const products = await Product.countDocuments({
            seller: req.user.id
        });

        const orders = await Orders.find()
        .populate("orderItems.product");

        const sellerOrders = orders.filter(order =>
            order.orderItems.some(
                item => 
                    item.product &&
                item.product.seller.toString() === req.user.id
            )
        );

       let revenue = 0;

sellerOrders.forEach(order => {
    order.orderItems.forEach(item => {

        if (
            item.product &&
            item.product.seller.toString() === req.user.id
        ) {
            revenue += item.product.price * item.quantity;
        }

    });
});

        res.json({
            products,
            orders : sellerOrders.length,
            revenue
        });
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    createOrder,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus,
    getSellerStats

};