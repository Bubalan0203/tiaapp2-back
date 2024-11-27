const Sales = require('../models/sales.model')
async function createSales(salesdata) {
    return await Sales.create(salesdata);
  }
  async function getAllSales() {
    return await Sales.find();
  } 

  async function deleteSalesById(id) {
    return await Sales.deleteOne({ _id: id });
  }
  
  module.exports = { createSales, getAllSales, deleteSalesById };
  