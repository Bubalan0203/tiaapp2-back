const mongoose = require('mongoose');

const FranchiseSchema = new mongoose.Schema({
  franchiseName: { type: String, required: true }, // Name of the franchise
  franchiseId: { type: String, required: true, unique: true }, // Unique ID of the franchise
  branchName: { type: String, required: true }, // Branch name of the franchise
  products: [{
    product: { type: String, required: true }, // Name of the product
    price: { type: Number, required: true },   // Price of the product
    count: { type: Number, required: true },   // Number of products sold
    total: { type: Number, required: true },   // Total cost (count * price)
    paymentPaid: { type: Number, default: 0 }, // Total payment already paid for the product
    paymentPending: { type: Number, default: 0 }, // Remaining payment to be made
    addedDate: { type: Date, default: Date.now }, // Date when the product was added
    payments: [{
      amount: { type: Number, required: true }, // Amount paid for the product
      date: { type: Date, default: Date.now }    // Date when the payment was made
    }]
  }]
});

// Create the Franchise model using the FranchiseSchema
const Franchise = mongoose.model('Franchise', FranchiseSchema);

module.exports = Franchise;
