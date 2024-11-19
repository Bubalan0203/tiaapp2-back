const express = require('express');
const multer = require('multer');
const { uploadFinancialData } = require('../controllers/uploadvip.controller');

const viprouter = express.Router();
const upload = multer(); // Multer for handling file uploads

// Route for financial data upload
viprouter.post('/upload-financial-data', upload.single('file'), uploadFinancialData);

module.exports = viprouter;
