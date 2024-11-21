const Product = require('../models/product.model');

// Create a new product
const createProduct = async (productData) => {
    // Ensure the product name is unique (case-insensitive)
    const existingProduct = await Product.findOne({
        productName: { $regex: new RegExp(`^${productData.productName}$`, 'i') },
    });

    if (existingProduct) {
        throw new Error('Product name must be unique');
    }

    const product = new Product(productData);
    return await product.save();
};

// Fetch all products
const getAllProducts = async () => {
    return await Product.find();
};

// Delete a product by its name (case-insensitive)
const deleteProductByName = async (productName) => {
    return await Product.findOneAndDelete({
        productName: { $regex: new RegExp(`^${productName}$`, 'i') },
    });
};

module.exports = {
    createProduct,
    getAllProducts,
    deleteProductByName,
};
