const uploadCompanyService = require('../services/company.service');
 
exports.uploadExcel = async (req, res) => {
  try {
    const { totals, month, year, replace = false } = req.body;
    if (!totals || !month || !year) {
      return res.status(400).json({ message: 'Invalid totals, month, or year' });
    }

    const result = await uploadCompanyService.processAndSaveData(totals, month, year, replace);
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
      const allRecords = await uploadCompanyService.getAllRecords(); // Fetch all records
      return res.status(200).json(allRecords); // Return all records
    }

    // If only month is "All", filter by year only
    if (month === "All") {
      const recordsByYear = await uploadCompanyService.getRecordsByYear(year); // Fetch records by year
      return res.status(200).json(recordsByYear);
    }

    // If only year is "All", filter by month only
    if (year === "All") {
      const recordsByMonth = await uploadCompanyService.getRecordsByMonth(month); // Fetch records by month
      return res.status(200).json(recordsByMonth);
    }

    // Combine month and year if both are provided
    const monthYear = `${month} ${year}`;
    const existingRecord = await uploadCompanyService.checkIfRecordExists(monthYear);

    if (existingRecord) {
      return res.status(200).json([existingRecord]); // Return record as an array
    } else {
      return res.status(200).json([]); // Return an empty array if no records are found
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.deleteRecord = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Month and Year are required' });
    }

    const monthYear = `${month} ${year}`;

    // Call the service to delete the record
    const result = await uploadCompanyService.deleteRecordByMonthYear(monthYear);

    if (!result) {
      return res.status(404).json({ message: `No record found for ${monthYear}` });
    }

    return res.status(200).json({ message: `Record for ${monthYear} deleted successfully` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } 
};