const express = require('express');
const uploadCompanyRouter = express.Router();
const uploadCompanyController = require('../controllers/company.controller');

// Route to handle file upload
uploadCompanyRouter.post('/upload', uploadCompanyController.uploadExcel );

// Route to check if a record exists for a given month and year
uploadCompanyRouter.get('/checkRecord', uploadCompanyController.checkRecord);

uploadCompanyRouter.delete('/deleteRecord', uploadCompanyController.deleteRecord);

module.exports = uploadCompanyRouter;
