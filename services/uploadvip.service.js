const mongoose = require('mongoose');
const DataModel = require('../models/uploadvip.model'); // Assuming this is the data model for storing file data

// Function to calculate totals from the uploaded data
async function calculateTotals(data) {
  try {
    const totalCollection = data.reduce((acc, row) => acc + (row["Collection"] || 0), 0);
    const totalPayment = data.reduce((acc, row) => acc + (row["Total Payment"] || 0), 0);
    const paymentPaid = data.reduce((acc, row) => acc + (row["Payment Paid"] || 0), 0);
    const paymentPending = data.reduce((acc, row) => acc + (row["Payment Pending"] || 0), 0);

    return {
      totalCollection,
      totalPayment,
      paymentPaid,
      paymentPending,
    };
  } catch (error) {
    console.error('Error calculating totals:', error);
    throw new Error('Error calculating totals');
  }
}

// Function to check if data already exists for the given month and year
async function getDataByMonthYear(month, year) {
  try {
    const data = await DataModel.findOne({ month, year });
    return data;
  } catch (error) {
    console.error(`Error checking existing data for ${month} ${year}:`, error);
    throw new Error('Error checking existing data');
  }
}

// Function to save new data along with totals to the database
async function saveData(month, year, data, totals) {
  try {
    const newData = new DataModel({
      month,
      year,
      data,
      totals,
    });

    // Validate data before saving
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid data format or empty data array');
    }

    // Save the data to the database
    await newData.save();
    return newData;
  } catch (error) {
    console.error(`Error saving data for ${month} ${year}:`, error);
    throw new Error('Error saving data');
  }
}

module.exports = { saveData, getDataByMonthYear, calculateTotals };
