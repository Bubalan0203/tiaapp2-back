const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: String, required: true },
  data: { type: Array, required: true },
  totals: {
    totalCollection: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    paymentPaid: { type: Number, required: true },
    paymentPending: { type: Number, required: true },
  },
});

// Create a unique index on month and year to prevent duplicate entries
dataSchema.index({ month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Data', dataSchema);
