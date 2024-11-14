const UploadVIPFranchise = require('../models/uploadvipfranchise.model');

exports.processAndSaveData = async (totals, month, year, replace = false) => {
  const monthYear = `${month} ${year}`;

  // Check if record exists and handle replacement
  const existingRecord = await UploadVIPFranchise.findOne({ monthYear });

  if (existingRecord && !replace) {
    throw new Error(`Record already exists for ${monthYear}`);
  }

  // If replacing, update the existing record, otherwise create a new one
  if (existingRecord && replace) {
    existingRecord.totals = totals;
    await existingRecord.save();
    return { message: `Data successfully replaced for ${monthYear}`, totals };
  }

  const newRecord = new UploadVIPFranchise({
    monthYear,
    totals
  });

  await newRecord.save();

  return { message: `Data successfully uploaded for ${monthYear}`, totals };
};

// Check if a record exists for a specific month and year
exports.checkIfRecordExists = async (monthYear) => {
  return await UploadVIPFranchise.findOne({ monthYear });
};
