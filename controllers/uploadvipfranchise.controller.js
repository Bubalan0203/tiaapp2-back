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

exports.checkRecord = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Return all records if both month and year are "All"
    if (month === "All" && year === "All") {
      const allRecords = await uploadVIPFranchiseService.getAllRecords();
      return res.status(200).json({ exists: allRecords.length > 0, records: allRecords });
    }

    // If only month is "All", filter by year only
    if (month === "All") {
      const recordsByYear = await uploadVIPFranchiseService.getRecordsByYear(year);
      return res.status(200).json({ exists: recordsByYear.length > 0, records: recordsByYear });
    }

    // If only year is "All", filter by month only
    if (year === "All") {
      const recordsByMonth = await uploadVIPFranchiseService.getRecordsByMonth(month);
      return res.status(200).json({ exists: recordsByMonth.length > 0, records: recordsByMonth });
    }

    // Filter by specific month and year
    const monthYear = `${month} ${year}`;
    const recordsByMonthYear = await uploadVIPFranchiseService.getRecordsByMonthYear(monthYear);

    return res.status(200).json({ exists: recordsByMonthYear.length > 0, records: recordsByMonthYear });
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
    const result = await uploadVIPFranchiseService.deleteRecordByMonthYear(monthYear);

    if (!result) {
      return res.status(404).json({ message: `No record found for ${monthYear}` });
    }

    return res.status(200).json({ message: `Record for ${monthYear} deleted successfully` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
