const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");


const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!wishlist) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json(wishlist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {

    const { productId } = req.params;


    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }


    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });


    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        items: [],
      });
    }


    const alreadyAdded = wishlist.items.some(
      item => item.product.toString() === productId
    );


    if (alreadyAdded) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }


    wishlist.items.push({
      product: productId,
    });


    await wishlist.save();


    res.status(201).json({
      message: "Added to wishlist",
      wishlist,
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {

  try {

    const { productId } = req.params;


    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    });


    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }



    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );


    await wishlist.save();


    res.status(200).json({
      message: "Removed from wishlist",
      wishlist,
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

const clearWishlist = async(req,res)=>{

  try{

    const wishlist = await Wishlist.findOne({
      user:req.user.id
    });


    if(!wishlist){
      return res.status(404).json({
        message:"Wishlist not found"
      });
    }


    wishlist.items=[];

    await wishlist.save();


    res.status(200).json({
      message:"Wishlist cleared"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

module.exports = {  getWishlist,  addToWishlist,  removeFromWishlist,  clearWishlist };