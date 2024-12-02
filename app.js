const express=require("express");
const helmet = require('helmet');
const cors=require('cors');
const { router } = require("./routes/index.routes");
const app=express()

app.use(cors({
   origin: '*', 
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
   allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Apply Helmet middleware for security headers

app.use('/api', router);

module.exports={app}