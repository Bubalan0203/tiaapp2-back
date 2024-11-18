const mongoose = require('mongoose');

const UploadCompanySchema = new mongoose.Schema({
  monthYear: { 
    type: String, 
    unique: true, 
    required: true // Format: "Month Year" (e.g., "October 2024")
  },
  totals: {
    courseFee: { type: Number, required: true },
    companyRevenue: { type: Number, required: true },
    paymentPaid: { type: Number, required: true },
    paymentPending: { type: Number, required: true }
  }
});

// Ensure the monthYear is unique across the collection.
UploadCompanySchema.index({ monthYear: 1 }, { unique: true });

module.exports = mongoose.model('UploadCompany', UploadCompanySchema);
