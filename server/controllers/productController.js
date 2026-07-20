const Product = require("../models/Product");
const User = require("../models/User");


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
        const { name, description, price, image, category } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
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
        console.log(req.query);

        const keyword = req.query.search
            ? {
                  name: {
                      $regex: req.query.search,
                      $options: "i",
                  },
              }
            : {};

        console.log(keyword);

   const products = await Product.find({
    ...keyword,
    // isActive: true
})
            .populate("seller", "email role");

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
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

const getNewProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 }) 
            .limit(8);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({
            seller: req.user.id,
             
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this product!",
      });
    }

    const allowedFields = ["name", "description", "price", "image", "category"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async(req,res)=>{
    try{

        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }


        // make sure seller owns the product
        if(product.seller.toString() !== req.user.id){
            return res.status(403).json({
                message:"You are not allowed to delete this product"
            });
        }


        product.isActive = false;

        await product.save();


        res.json({
            message:"Product removed from store"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
}

module.exports = {
   getNewProducts, createProduct, getProducts, getProductById, getMyProducts,updateProduct, deleteProduct
}