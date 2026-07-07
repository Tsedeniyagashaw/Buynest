const User = require('../models/user')

const getSellerProfile = async (req, res) => {
    try {
        const seller = await User.findById(req.user.id).select("-password");

        if(!seller){
            return res.status(404).json({
                message: "Seller Not Found!!",
            });
        }
        res.json(seller);
    }
    catch (error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getSellerProfile }