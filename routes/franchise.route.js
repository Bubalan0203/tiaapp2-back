const express = require('express');
const franchiseRouter = express.Router();
const franchiseController = require('../controllers/franchise.controller');

franchiseRouter.post('/', franchiseController.createFranchise);
franchiseRouter.get('/', franchiseController.getAllFranchise);
franchiseRouter.get('/:franchiseId', franchiseController.getFranchiseById);

franchiseRouter.post('/:franchiseId/sales', franchiseController.addSalesData);

franchiseRouter.put('/:franchiseId/products/:productId/pay', franchiseController.updatePayment);

franchiseRouter.delete('/:franchiseId', franchiseController.deleteFranchise);


module.exports = franchiseRouter;
