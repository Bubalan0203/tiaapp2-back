const uploadVIPFranchiseService = require('../services/uploadvipfranchise.service');

exports.uploadExcel = async (req, res) => {
  try {
    const { totals, month, year, replace = false } = req.body;
    if (!totals || !month || !year) {
      return res.status(400).json({ message: 'Invalid totals, month, or year' });
    }

    const result = await uploadVIPFranchiseService.processAndSaveData(totals, month, year, replace);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Check if a record exists for the given month and year
exports.checkRecord = async (req, res) => {
  try {
    const { month, year } = req.query;
    const monthYear = `${month} ${year}`;

    const existingRecord = await uploadVIPFranchiseService.checkIfRecordExists(monthYear);
    return res.status(200).json({ exists: existingRecord ? true : false });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
