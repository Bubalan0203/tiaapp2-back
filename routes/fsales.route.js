const express=require('express')
const fsalesRouter = express.Router();
const fsalesController=require('../controllers/fsales.controller')

fsalesRouter.post('/', fsalesController.createFsales);
fsalesRouter.get('/', fsalesController.getAllFsales);

module.exports=fsalesRouter;