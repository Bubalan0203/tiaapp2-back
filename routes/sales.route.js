const express=require('express')
const salesRouter = express.Router();
const salesController=require('../controllers/sales.controller')

salesRouter.post('/', salesController.createSales);

salesRouter.get('/', salesController.getAllSales);
salesRouter.delete('/', salesController.deleteSalesByDescription);


module.exports=salesRouter;