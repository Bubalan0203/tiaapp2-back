const hostaffService = require('../services/ho.service')

// Controller to create a new Ho record
exports.createHoRecord = async (req, res) => {
    try {
        const { hoName, hoId } = req.body;
        const newHostaff = await hostaffService.createHoRecord({ hoName, hoId });
        res.status(201).json(newHostaff);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to add salary details to an existing Ho record by hoId
exports.addSalaryDetails = async (req, res) => {
    try {
        const { hoId } = req.params;
        const salaryData = req.body;
        const updatedHostaff = await hostaffService.addSalaryDetails(hoId, salaryData);
        res.status(200).json(updatedHostaff);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to get all Hostaff records
exports.getAllHostaffs = async (req, res) => {
    try {
        const hostaffs = await hostaffService.getAllHostaffs();
        res.status(200).json(hostaffs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a single Hostaff record by hoId
exports.getHostaffByHoId = async (req, res) => {
    try {
        const { hoId } = req.params;
        const hostaff = await hostaffService.getHostaffByHoId(hoId);
        if (!hostaff) {
            return res.status(404).json({ error: 'Hostaff record not found' });
        }
        res.status(200).json(hostaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
``
