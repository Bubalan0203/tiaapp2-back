const express = require('express');
const uploadvipfranchiseRouter = express.Router();
const uploadVIPFranchiseController = require('../controllers/uploadvipfranchise.controller');

// Route to handle file upload
uploadvipfranchiseRouter.post('/upload', uploadVIPFranchiseController.uploadExcel);

// Route to check if a record exists for a given month and year
uploadvipfranchiseRouter.get('/checkRecord', uploadVIPFranchiseController.checkRecord);

// Route to delete a record for a given month and year
uploadvipfranchiseRouter.delete('/deleteRecord', uploadVIPFranchiseController.deleteRecord);


module.exports = uploadvipfranchiseRouter;
