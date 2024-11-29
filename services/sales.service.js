const Sales = require('../models/sales.model')
async function createSales(salesdata) {
    return await Sales.create(salesdata);
  }
  
  async function getAllSales(query) {
    const { month, year } = query;

    const filter = {};
    const exprConditions = [];

    if (month && month !== 'All') {
        const monthIndex = new Date(`${month} 1, 2000`).getMonth(); // Get month index (0-11)
        exprConditions.push({ $eq: [{ $month: '$createdAt' }, monthIndex + 1] });
    }
    if (year && year !== 'All') {
        exprConditions.push({ $eq: [{ $year: '$createdAt' }, parseInt(year)] });
    }

    if (exprConditions.length > 0) {
        filter['$expr'] = { $and: exprConditions }; // Combine month and year conditions
    }

    return await Sales.find(filter).sort({ createdAt: -1 });
}

  async function deleteSalesById(id) {
    return await Sales.deleteOne({ _id: id });
  }
  
  module.exports = { createSales, getAllSales, deleteSalesById };
  