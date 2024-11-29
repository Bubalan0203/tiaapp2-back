const Fsales = require('../models/fsales.model')
async function createFsales(fsalesdata) {
    return await Fsales.create(fsalesdata);
  }
  async function getAllFsales(query) {
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

    return await Fsales.find(filter).sort({ createdAt: -1 });
}

  
  async function deleteSalesById(id) {
    return await Fsales.deleteOne({ _id: id });
  }
module.exports={createFsales,getAllFsales,deleteSalesById}