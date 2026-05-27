const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity} = req.body;

        let cart = await Cart.findOne({ user: userId});

        if (!cart) {
            cart = await Cart.create({
                user:userId,
                items: [],
            });
        }

        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({
                product: productId,
                quantity,
            })
        }
        await cart.save();

        res.json(cart);
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};


const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if(!cart){
            return res.json({ items: []});
        }

        res.json(cart);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};
module.exports = { addToCart,  getCart}
