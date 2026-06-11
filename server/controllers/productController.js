const Product = require("../models/Product")


const createProduct = async ( req, res) => {
    try{
        const seller = await User.findById(req.user.id);

        if (!seller) {
    return res.status(404).json({
        message: "User not found"
    });
}

if (seller.role !== "seller") {
    return res.status(403).json({
        message: "Only sellers can create products"
    });
}

        if(!seller.isApproved) {
            return res.status(403).json({
                message: "Seller not Approved!"
            })
        }      
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
        const keyword = req.query.search 
        ? {
            name: {
                $regex: req.query.search,
                $options: "i"
            }
        } : {};

        const product = await Product.find(keyword)
        .populate("seller", "email role");

        res.json(products);
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
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

const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({
            seller: req.user.id 
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateProduct = async (req, res ) => {
    try {
        const { name, description, price, image} = req.body;
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to update this product!"
            });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;

        const updateProduct = await product.save()

        res.json(updateProduct);
    }

    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found!!"
            });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not Authorized to delete this product!!"
            });
        }
        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createProduct, getProducts, getProductById, getMyProducts,updateProduct, deleteProduct
}