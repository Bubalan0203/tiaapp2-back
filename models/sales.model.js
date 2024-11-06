const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    productName: { type: String, required: true},
    description: { type: String, required: true },
    price:{type:String,required:true},
    count:{type:Number,required:true},
    total:{type:String,required:true}
});

const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales;
