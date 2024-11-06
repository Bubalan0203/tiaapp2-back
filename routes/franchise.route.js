const express=require('express')
const franchiseRouter = express.Router();
const franchiseController=require('../controllers/franchise.controller')

franchiseRouter.post('/',franchiseController.createFranchise);
franchiseRouter.get('/',franchiseController.getAllFranchise);
module.exports=franchiseRouter;