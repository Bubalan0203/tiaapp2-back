const Hostaff = require('../models/ho.model');

// Service to create a new Ho record with hoName and hoId
exports.createHoRecord = async ({ hoName, hoId }) => {
    const newHostaff = new Hostaff({ hoName, hoId });
    return await newHostaff.save();
};

// Service to add salary details to an existing Ho record by hoId
exports.addSalaryDetails = async (hoId, salaryData) => {
    const hostaff = await Hostaff.findOneAndUpdate(
        { hoId },
        { $push: { salary: salaryData } },
        { new: true, runValidators: true }
    );
    if (!hostaff) throw new Error('Hostaff record not found');
    return hostaff;
};

// Service to get all Hostaff records
exports.getAllHostaffs = async () => {
    return await Hostaff.find();
};

// Service to get a single Hostaff record by hoId
exports.getHostaffByHoId = async (hoId) => {
    return await Hostaff.findOne({ hoId });
};
