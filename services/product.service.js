const Product = require('../models/product.model');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const getAllProducts = async () => {
    return await Product.find();
};

module.exports = {
    createProduct,
    getAllProducts,
};
