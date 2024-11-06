const mongoose = require('mongoose');

const VipSchema = new mongoose.Schema({
    vipName: { type: String, required: true},
    vipId: { type: String, required: true },
    firstBuisness:{type:Date,required:true},
});

const Vip = mongoose.model('Vip', VipSchema);
module.exports = Vip;
