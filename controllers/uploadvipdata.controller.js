const uploadVIPService = require('../services/uploadvipdata.service');

// Upload Excel data and save totals to the database
exports.uploadExcel = async (req, res) => {
  try {
    const { totals, month, year, replace = false } = req.body;

    // Validation for required fields
    if (!totals || !month || !year) {
      return res.status(400).json({ message: 'Invalid totals, month, or year' });
    }

    // Process and save data via the service layer
    const result = await uploadVIPService.processAndSaveData(totals, month, year, replace);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in uploadExcel:', error);
    return res.status(500).json({ message: error.message });
  }
};

exports.checkRecord = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Return all records if both month and year are "All"
    if (month === "All" && year === "All") {
      const allRecords = await uploadVIPService.getAllRecords();
      return res.status(200).json({ exists: allRecords.length > 0, records: allRecords });
    }

    // If only month is "All", filter by year only
    if (month === "All") {
      const recordsByYear = await uploadVIPService.getRecordsByYear(year);
      return res.status(200).json({ exists: recordsByYear.length > 0, records: recordsByYear });
    }

    // If only year is "All", filter by month only
    if (year === "All") {
      const recordsByMonth = await uploadVIPService.getRecordsByMonth(month);
      return res.status(200).json({ exists: recordsByMonth.length > 0, records: recordsByMonth });
    }

    // Filter by specific month and year
    const monthYear = `${month} ${year}`;
    const recordsByMonthYear = await uploadVIPService.getRecordsByMonthYear(monthYear);

    return res.status(200).json({ exists: recordsByMonthYear.length > 0, records: recordsByMonthYear });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Delete a record for a specific month and year
exports.deleteByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Validation for required fields
    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required.' });
    }

    const monthYear = `${month} ${year}`;

    // Service call to delete the record
    const result = await uploadVIPService.deleteRecordByMonthYear(monthYear);

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: `Record for ${monthYear} successfully deleted.` });
    } else {
      return res.status(404).json({  message: `Record for ${monthYear} successfully deleted.` });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({ message: error.message });
  }
};
