const express=require('express')
const salesRouter = express.Router();
const salesController=require('../controllers/sales.controller')

salesRouter.post('/', salesController.createSales);

salesRouter.get('/', salesController.getAllSales);

salesRouter.delete('/:id', salesController.deleteSalesById);



module.exports=salesRouter;