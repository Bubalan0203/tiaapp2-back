const express = require('express');
const productController = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.delete('/name/:productName', productController.deleteProductByName);


module.exports =productRouter;
