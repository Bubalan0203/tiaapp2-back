const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
};
