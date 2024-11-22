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

// Check if a record exists for the given month and year or return filtered records
// Check if a record exists for the given month and year or return filtered records
exports.checkRecord = async (req, res) => {
  try {
    const { month, year } = req.query;   // Handle cases where "All" is provided for either month or year
    if (month === 'All' && year === 'All') {
      const allRecords = await uploadVIPService.getAllRecords(); // Fetch all records
      return res.status(200).json(allRecords);
    }

    if (month === 'All') {
      const recordsByYear = await uploadVIPService.getRecordsByYear(year); // Filter by year only
      return res.status(200).json(recordsByYear);
    }

    if (year === 'All') {
      const recordsByMonth = await uploadVIPService.getRecordsByMonth(month); // Filter by month only
      return res.status(200).json(recordsByMonth);
    }

    // Combine month and year for precise filtering
    const monthYear = `${month} ${year}`;
    
    const existingRecord = await uploadVIPService.checkIfRecordExists(monthYear);
    if (existingRecord) {
      return res.status(200).json({ exists:true, records: existingRecord });
       // Return a response with a flag indicating the record exists
    } else {
      return res.status(200).json({
        recordExists: false,
        message: `No record found for ${monthYear}. You can upload new data.`
      }); // No record found, so it’s safe to upload
    }
  } catch (error) {
    console.error('Error in checkRecord:', error);
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
      return res.status(404).json({ message: `No record found for ${monthYear}.` });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({ message: error.message });
  }
};
