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

exports.getAllRecords = async () => {
  return await UploadVIPFranchise.find();
};

exports.getRecordsByYear = async (year) => {
  return await UploadVIPFranchise.find({ monthYear: new RegExp(`${year}$`, 'i') });
};

exports.getRecordsByMonth = async (month) => {
  return await UploadVIPFranchise.find({ monthYear: new RegExp(`^${month}`, 'i') });
};

exports.getRecordsByMonthYear = async (monthYear) => {
  return await UploadVIPFranchise.find({ monthYear });
};


exports.deleteRecordByMonthYear = async (monthYear) => {
  return await UploadVIPFranchise.findOneAndDelete({ monthYear });
};
