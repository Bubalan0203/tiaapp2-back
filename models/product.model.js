const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true, // Remove extra whitespace
    },
});

// Add a case-insensitive index for productName
ProductSchema.index({ productName: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
