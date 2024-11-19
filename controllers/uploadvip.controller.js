const XLSX = require('xlsx');
const Franchise = require('../models/franchise.model');

// Upload Financial Data from Excel
const uploadFinancialData = async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Excel file is required.' });
    }

    // Parse the Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    // Process rows and update the database
    for (const row of rows) {
      const { FranchiseID, RoyaltyAmount, AmountPaid, AmountPending } = row;

      // Find the franchise by ID
      const franchise = await Franchise.findOne({ franchiseId: FranchiseID });
      if (!franchise) {
        console.log(`Franchise with ID ${FranchiseID} not found.`);
        continue;
      }

      // Check for duplicate records for the same month and year
      const existingRecord = franchise.financialRecords.find(
        (record) => record.month === month && record.year === parseInt(year)
      );

      if (existingRecord) {
        return res.status(400).json({
          error: `Record for ${month} ${year} already exists for FranchiseID ${FranchiseID}.`,
        });
      }

      // Add new financial record
      franchise.financialRecords.push({
        month,
        year,
        royaltyAmount: RoyaltyAmount,
        amountPaid: AmountPaid,
        amountPending: AmountPending,
      });

      await franchise.save();
    }

    res.status(200).json({ message: 'Financial data uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { uploadFinancialData };
