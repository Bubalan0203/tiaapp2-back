const uploadVIPService = require('../services/uploadvipdata.service');

exports.uploadExcel = async (req, res) => {
  try {
    const { totals, month, year, replace = false } = req.body;
    if (!totals || !month || !year) {
      return res.status(400).json({ message: 'Invalid totals, month, or year' });
    }

    const result = await uploadVIPService.processAndSaveData(totals, month, year, replace);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Check if a record exists for the given month and year
exports.checkRecord = async (req, res) => {
  try {
    const { month, year } = req.query;

    // If both month and year are "All", return all records
    if (month === "All" && year === "All") {
      const allRecords = await uploadVIPService.getAllRecords(); // Fetch all records
      return res.status(200).json(allRecords); // Return all records
    }

    // If only month is "All", filter by year only
    if (month === "All") {
      const recordsByYear = await uploadVIPService.getRecordsByYear(year); // Fetch records by year
      return res.status(200).json(recordsByYear);
    }

    // If only year is "All", filter by month only
    if (year === "All") {
      const recordsByMonth = await uploadVIPService.getRecordsByMonth(month); // Fetch records by month
      return res.status(200).json(recordsByMonth);
    }

    // Combine month and year if both are provided
    const monthYear = `${month} ${year}`;
    const existingRecord = await uploadVIPService.checkIfRecordExists(monthYear);

    if (existingRecord) {
      return res.status(200).json([existingRecord]); // Return record as an array
    } else {
      return res.status(200).json([]); // Return an empty array if no records are found
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.deleteByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required.' });
    }

    const monthYear = `${month} ${year}`;

    const result = await uploadVIPService.deleteRecordByMonthYear(monthYear);

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: `Record for ${monthYear} successfully deleted.` });
    } else {
      return res.status(404).json({ message: `No record found for ${monthYear}.` });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({ message: error.message });
  }
};
