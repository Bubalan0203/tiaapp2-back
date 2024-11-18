const express=require('express')
const vipRouter = express.Router();
const vipController=require('../controllers/vip.controller')

vipRouter.post('/',vipController.createVip);

vipRouter.get('/',vipController.getAllVip);

module.exports=vipRouter;