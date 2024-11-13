const { calculateTotals, saveData, getDataByMonthYear } = require('../services/uploadvip.service');
const XLSX = require('xlsx');

async function uploadFile(req, res){
  try {
    const { fileData } = req; // Multer stores the uploaded file here
    const { month, year } = req.body; // Month and year from request body
console.log(month);
console.log(year);
console.log(fileData);
    // Validate if file, month, and year are provided
    if (!fileData || !month || !year) {
      return res.status(400).json({ message: 'Please provide all required fields: file, month, year.' });
    }

    // Parse the Excel file using XLSX
    const workbook = XLSX.read(fileData.buffer, { type: 'buffer' }); // Read the buffer from the file
    const sheetName = workbook.SheetNames[0]; // Get the first sheet name
    const sheet = workbook.Sheets[sheetName]; // Get the sheet object
    const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON format

    // Check if data already exists for the given month and year
    const existingData = await getDataByMonthYear(month, year);

    if (existingData) {
      return res.status(400).json({
        message: `Data for ${month} ${year} already exists. Do you want to replace the existing data?`,
      });
    }

    // Calculate totals from the parsed data
    const totals = calculateTotals(jsonData);

    // Save the new data to the database
    const savedData = await saveData(month, year, jsonData, totals);

    // Return the success response
    return res.status(200).json({
      message: 'Data uploaded successfully!',
      data: savedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong while processing the file.' });
  }
};

module.exports={uploadFile}
