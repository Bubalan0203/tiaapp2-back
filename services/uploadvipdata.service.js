const UploadVIP = require('../models/uploadvipdata.model');

exports.processAndSaveData = async (totals, month, year, replace = false) => {
  try {
    const monthYear = `${month} ${year}`;

   // Validate totals object
if (
  !totals ||
  totals.collection === undefined ||
  totals.revenue === undefined ||
  totals.additionalRevenue === undefined ||
  totals.totalPayment === undefined ||
  totals.paymentPaid === undefined ||
  totals.paymentPending === undefined
) {
  throw new Error('Missing required totals fields.');
}

    

    // Check if the record exists
    const existingRecord = await UploadVIP.findOne({ monthYear });

    // If replacing, update the existing record
    if (existingRecord && replace) {
      existingRecord.totals = totals;
      await existingRecord.save();
      return { message: `Data successfully replaced for ${monthYear}`, totals };
    }

    // If a record exists and replacement is not allowed, throw an error
    if (existingRecord && !replace) {
      throw new Error(`Record already exists for ${monthYear}. Use replace=true to overwrite`);
    }

    // Create a new record if no existing record is found
    const newRecord = new UploadVIP({
      monthYear,
      totals,
    });

    await newRecord.save();
    return { message: `Data successfully uploaded for ${monthYear}`, totals };
  } catch (error) {
    console.error('Error in processAndSaveData:', error);
    throw error;
  }
};

// Check if a record exists for a specific month and year
exports.checkIfRecordExists = async (monthYear) => {
  try {
    const record = await UploadVIP.findOne({ monthYear });
    if (!record) {
      
    }
    return record;
  } catch (error) {
    console.error('Error in checkIfRecordExists:', error);
    throw error;
  }
};


// Get all records from the database
exports.getAllRecords = async () => {
  try {
    return await UploadVIP.find({});
  } catch (error) {
    console.error('Error in getAllRecords:', error);
    throw error;
  }
};

// Get records filtered by year
exports.getRecordsByYear = async (year) => {
  try {
    return await UploadVIP.find({ monthYear: { $regex: year, $options: 'i' } });
  } catch (error) {
    console.error('Error in getRecordsByYear:', error);
    throw error;
  }
};

// Get records filtered by month
exports.getRecordsByMonth = async (month) => {
  try {
    return await UploadVIP.find({ monthYear: { $regex: `^${month}`, $options: 'i' } });
  } catch (error) {
    console.error('Error in getRecordsByMonth:', error);
    throw error;
  }
};

// Delete a record by month and year
exports.deleteRecordByMonthYear = async (monthYear) => {
  try {
    const result = await UploadVIP.deleteOne({ monthYear });
    if (result.deletedCount === 0) {
      throw new Error();
    }
    return { message: `Record for ${monthYear} deleted successfully.` };
  } catch (error) {
    console.error('Error in deleteRecordByMonthYear:', error);
    throw error;
  }
};
