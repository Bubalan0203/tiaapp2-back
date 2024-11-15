const mongoose = require('mongoose');


const HoSchema = new mongoose.Schema({
    hoName: { type: String, required: true }, // Name of the franchise
    hoId: { type: String, required: true, unique: true }, // Unique ID of the franchise
    salary: [{
      salary: { type: Number, required: true },   // Price of the product
      days: { type: Number, required: true },   // Number of products sold
      total: { type: Number, required: true },   // Total cost (count * price)
      date: { type: Date, default: Date.now }, // Date when the product was added
    }]
  });
  
  const Hostaff = mongoose.model('Hostaff', HoSchema);
  
  module.exports = Hostaff;
