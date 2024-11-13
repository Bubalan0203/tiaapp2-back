const Franchise = require('../models/franchise.model');

async function createFranchise(franchiseData) {
  return await Franchise.create(franchiseData);
}

async function getAllFranchise() {
  return await Franchise.find();
}

async function getFranchiseById(franchiseId) {
  return await Franchise.findOne({ franchiseId });
}

async function addSalesToFranchise(franchiseId, salesData) {
    // Loop through each product in the salesData array
    for (const productData of salesData) {
      const { product, price, count, total, paymentPaid = 0, paymentPending = total } = productData;
    
      // Validate required fields
      if (!product || !price || !count || !total) {
        throw new Error('Invalid sales data: product, price, count, and total are required.');
      }
  
      try {
        // Find the franchise and push the new sales data to the products array
        const updatedFranchise = await Franchise.findOneAndUpdate(
          { franchiseId },
          { $push: { products: { product, price, count, total, paymentPaid, paymentPending, payments: [] } } },
          { new: true }
        );
  
        if (!updatedFranchise) {
          throw new Error('Franchise not found'); // Throw error if franchise does not exist
        }
  
        return updatedFranchise; // Return the updated franchise document
      } catch (error) {
        throw new Error(`Error adding sales data: ${error.message}`);
      }
    }
  }
  
  
  async function updateProductPayment(franchiseId, productId, paymentAmount) {
    try {
      // Validate that paymentAmount is a number
      if (paymentAmount === undefined || isNaN(paymentAmount)) {
        throw new Error('A valid payment amount is required.');
      }
  
      console.log('Franchise ID:', franchiseId);
      console.log('Product ID:', productId);
  
      // Retrieve the franchise to validate payment constraints
      const franchise = await Franchise.findOne({ franchiseId, 'products._id': productId });
      
      if (!franchise) {
        throw new Error('Franchise or product not found');
      }
  
      // Locate the specific product in the products array
      const product = franchise.products.id(productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
  
      const paymentPaid = product.paymentPaid || 0;
      const paymentPending = product.total - paymentPaid;
  
      // Validation to prevent overpayment for positive amounts
      if (paymentAmount > 0 && paymentAmount > paymentPending) {
        throw new Error('Payment amount exceeds the pending payment.');
      }
  
      // Validation for negative payments (refunds) to not exceed paid amount
      if (paymentAmount < 0 && Math.abs(paymentAmount) > paymentPaid) {
        throw new Error('Negative payment cannot exceed the amount already paid.');
      }
  
      // Proceed with the update if validation passes
      const updatedFranchise = await Franchise.findOneAndUpdate(
        { franchiseId, 'products._id': productId },
        {
          $inc: {
            'products.$.paymentPaid': paymentAmount,
            'products.$.paymentPending': -paymentAmount,
          },
          $push: {
            'products.$.payments': { amount: paymentAmount, date: new Date() },
          },
        },
        { new: true }
      );
  
      if (!updatedFranchise) {
        throw new Error('Franchise or product not found');
      }
  
      console.log('Updated Franchise:', updatedFranchise);
      return updatedFranchise;
  
    } catch (error) {
      throw new Error(`Error updating payment: ${error.message}`);
    }
  }
  
  
  
module.exports = { createFranchise, getAllFranchise, getFranchiseById, addSalesToFranchise, updateProductPayment };
