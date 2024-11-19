const mongoose = require('mongoose');

const FinancialRecordSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  royaltyAmount: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  amountPending: { type: Number, required: true },
});

const FranchiseSchema = new mongoose.Schema({
  franchiseName: { type: String, required: true },
  franchiseId: { type: String, required: true, unique: true },
  branchName: { type: String, required: true },
  products: [
    {
      product: { type: String, required: true },
      price: { type: Number, required: true },
      count: { type: Number, required: true },
      total: { type: Number, required: true },
      paymentPaid: { type: Number, default: 0 },
      paymentPending: { type: Number, default: 0 },
      addedDate: { type: Date, default: Date.now },
      payments: [
        {
          amount: { type: Number, required: true },
          date: { type: Date, default: Date.now },
        },
      ],
    },
  ],
  financialRecords: [FinancialRecordSchema],
});

const Franchise = mongoose.model('Franchise', FranchiseSchema);

module.exports = Franchise;
