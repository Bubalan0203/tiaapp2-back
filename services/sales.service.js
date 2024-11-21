const Sales = require('../models/sales.model')
async function createSales(salesdata) {
    return await Sales.create(salesdata);
  }
  async function getAllSales() {
    return await Sales.find();
  }
  async function deleteSalesByDescription(description) {
    return await Sales.deleteOne({ description });
  }
  
  module.exports = { createSales, getAllSales, deleteSalesByDescription };
  