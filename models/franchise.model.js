const mongoose = require('mongoose');

const FranchiseSchema = new mongoose.Schema({
    franchiseName: { type: String, required: true},
    franchiseId: { type: String, required: true },
    branchName:{type:String,required:true},
});

const Franchise = mongoose.model('Franchise', FranchiseSchema);
module.exports = Franchise;
