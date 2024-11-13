const express = require('express');
const franchiseRouter = express.Router();
const franchiseController = require('../controllers/franchise.controller');

// Route for creating a new franchise
franchiseRouter.post('/', franchiseController.createFranchise);

// Route for getting all franchises
franchiseRouter.get('/', franchiseController.getAllFranchise);

// Route for getting details of a specific franchise
franchiseRouter.get('/:franchiseId', franchiseController.getFranchiseById);

// Route for adding sales data to a specific franchise
franchiseRouter.post('/:franchiseId/sales', franchiseController.addSalesData);

// Route for updating payment info for a product (optional)
franchiseRouter.put('/:franchiseId/products/:productId/pay', franchiseController.updatePayment);




module.exports = franchiseRouter;
