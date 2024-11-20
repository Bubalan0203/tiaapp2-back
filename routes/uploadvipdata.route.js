const express = require('express');
const uploadvipRouter = express.Router();
const uploadVIPController = require('../controllers/uploadvipdata.controller');

// Route to handle file upload
uploadvipRouter.post('/upload',uploadVIPController.uploadExcel );

// Route to check if a record exists for a given month and year
uploadvipRouter.get('/checkRecord', uploadVIPController.checkRecord);

uploadvipRouter.delete('/deleteByMonthYear', uploadVIPController.deleteByMonthYear);


module.exports = uploadvipRouter;
