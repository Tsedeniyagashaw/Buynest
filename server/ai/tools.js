const Product = require("../models/Product");

async function searchProducts({ category, maxPrice }) {

    const query = {};

    if (category) {
        query.category = {
            $regex: category,
            $options: "i"
        };
    }

    if (maxPrice) {
        query.price = {
            $lte: maxPrice
        };
    }

    return await Product.find(query).limit(10);
}

module.exports = {
    searchProducts
};