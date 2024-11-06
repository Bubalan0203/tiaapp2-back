const mongoose = require('mongoose');

const VipSchema = new mongoose.Schema({
    vipName: { type: String, required: true },
    vipId: { type: String, required: true },
    firstBusiness: { type: Date, required: true }, // Corrected field name
});

// Virtual field to format 'firstBusiness' as 'dd mm yyyy'
VipSchema.virtual('firstBusinessFormatted').get(function () {
  const date = new Date(this.firstBusiness);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
});

VipSchema.set('toJSON', { virtuals: true });
VipSchema.set('toObject', { virtuals: true });

const Vip = mongoose.model('Vip', VipSchema);
module.exports = Vip;
