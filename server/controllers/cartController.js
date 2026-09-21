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

        const updatedCart = await Cart.findOne({
    user: req.user.id
}).populate("items.product");

        res.json(updatedCart);
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

const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });

           if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }
      

        const item = cart.items.find(
            i => i.product.toString() === productId 
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found in the cart"

            });
        }
        item.quantity = quantity;
await cart.save();

const updatedCart = await Cart.findOne({
    user: req.user.id
}).populate("items.product");

res.json(updatedCart);
    }

    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });

           if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
        await cart.save();

       const updatedCart = await Cart.findOne({
    user: req.user.id
}).populate("items.product");

res.json(updatedCart);
    }
    catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addToCart,  getCart, updateCartItem, removeFromCart}
