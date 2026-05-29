const Product = require("../models/Product")

const createProduct = async ( req, res) => {
    try{
        const { name, description, price, image } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            seller: req.user.id,

        });
        res.status(201).json(product);

    }

    catch(error){
        res.status(500).json({ message: error.message });

    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("seller", "email role");
        res.json(products);

    }catch(error){
        res.status(500).json({ message: error.message });

    }
};

const getProductById = async( req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "seller", "email role"
        );

        if(!product){
            return res.status(404).json({ message: "Product Not Found"});

        }
        res.json(product);

    }catch (error){
        res.status(500).json({ message: error.message });

    }
};

module.exports = {
    createProduct, getProducts, getProductById
}