const mongoose = require('mongoose');

const UploadVIPSchema = new mongoose.Schema({
  monthYear: { 
    type: String, 
    unique: true, 
    required: true // Format: "Month Year" (e.g., "October 2024")
  },
  totals: {
    collection: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    paymentPaid: { type: Number, required: true },
    paymentPending: { type: Number, required: true }
  }
});

// Ensure the monthYear is unique across the collection.
UploadVIPSchema.index({ monthYear: 1 }, { unique: true });

module.exports = mongoose.model('UploadVIP', UploadVIPSchema);
