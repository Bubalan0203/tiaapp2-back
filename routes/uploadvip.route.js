const express = require('express');
const uploadvipController = require('../controllers/uploadvip.controller');
const multer = require('multer');
const uploadRouter = express.Router();

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Define routes
uploadRouter.post('/upload', upload.single('file'), uploadvipController.uploadFile);

module.exports = uploadRouter;
