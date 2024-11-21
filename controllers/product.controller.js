const productService = require('../services/product.service');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        if (!productData.productName || productData.productName.trim() === '') {
            return res.status(400).json({ message: 'Product name is required' });
        }

        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        if (error.message === 'Product name must be unique') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Fetch all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Delete a product by its name
const deleteProductByName = async (req, res) => {
    try {
        const { productName } = req.params;

        if (!productName || productName.trim() === '') {
            return res.status(400).json({ message: 'Product name is required' });
        }

        const deletedProduct = await productService.deleteProductByName(productName);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    deleteProductByName,
};
