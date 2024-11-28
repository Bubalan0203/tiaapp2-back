const XLSX = require('xlsx');
const Franchise = require('../models/franchise.model');

// Upload Financial Data from Excel
const uploadFinancialData = async (req, res) => {
  try {
    const { month, year } = req.body;
    const { overwrite } = req.query; // Read overwrite flag from query parameters

    if (!req.file) {
      return res.status(400).json({ error: 'Excel file is required.' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const duplicateRecords = [];

    for (const row of rows) {
      const { Email, RoyaltyAmount, AmountPaid, AmountPending } = row;

      const franchise = await Franchise.findOne({ franchiseId: Email });
      if (!franchise) {
        console.log(`Franchise with ID ${Email} not found.`);
        continue;
      }

      // Find the index of the existing record for the given month/year
      const existingRecordIndex = franchise.financialRecords.findIndex(
        (record) => record.month === month && record.year === parseInt(year)
      );

      if (existingRecordIndex >= 0 && overwrite !== 'true') {
        // If record exists and overwrite is false, mark as duplicate
        duplicateRecords.push({ Email, existingRecordIndex });
        continue; // Skip replacing the record
      }

      if (existingRecordIndex >= 0 && overwrite === 'true') {
        // Replace the existing record if overwrite flag is true
        franchise.financialRecords[existingRecordIndex] = {
          month,
          year,
          royaltyAmount: RoyaltyAmount,
          amountPaid: AmountPaid,
          amountPending: AmountPending,
        };
      } else {
        // Add a new record if no existing record is found
        franchise.financialRecords.push({
          month,
          year,
          royaltyAmount: RoyaltyAmount,
          amountPaid: AmountPaid,
          amountPending: AmountPending,
        });
      }

      await franchise.save();
    }

    // If there are duplicates and overwrite is false, return a conflict
    if (duplicateRecords.length > 0 && overwrite !== 'true') {
      return res.status(409).json({
        error: 'Duplicate records found.',
        duplicateRecords,
      });
    }

    res.status(200).json({ message: 'Financial data uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { uploadFinancialData };
