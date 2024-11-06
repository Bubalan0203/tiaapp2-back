const Sales = require('../models/sales.model')
async function createSales(salesdata) {
    return await Sales.create(salesdata);
  }
  async function getAllSales() {
    return await Sales.find();
  }
module.exports={createSales,getAllSales}