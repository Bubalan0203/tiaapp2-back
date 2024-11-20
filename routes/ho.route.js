const express = require('express');
const horouter = express.Router();
const { createHoRecord, addSalaryDetails, getAllHostaffs, getHostaffByHoId, deleteHostaff } = require('../controllers/ho.controller');

// Route to create a new Ho record with hoName and hoId
horouter.post('/', createHoRecord);

// Route to add salary details to an existing Ho record by hoId
horouter.post('/addsalary/:hoId', addSalaryDetails);

// Route to get all Hostaff records
horouter.get('/', getAllHostaffs);
// Route to delete an HO staff record by hoId
horouter.delete('/:hoId', deleteHostaff);

// Route to get a single Hostaff record by hoId
horouter.get('/:hoId', getHostaffByHoId);

module.exports = horouter;
