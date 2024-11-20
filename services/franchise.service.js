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
  try {
    const updatedFranchise = await Franchise.findOneAndUpdate(
      { franchiseId },
      {
        $push: {
          products: salesData.map(({ product, price, count, total, paymentPaid = 0, paymentPending = total }) => ({
            product,
            price,
            count,
            total,
            paymentPaid,
            paymentPending,
            payments: [],
            addedDate: new Date(),
          })),
        },
      },
      { new: true }
    );

    if (!updatedFranchise) {
      throw new Error('Franchise not found');
    }

    return updatedFranchise;
  } catch (error) {
    throw new Error(`Error adding sales data: ${error.message}`);
  }
}
  
async function updateProductPayment(franchiseId, productId, paymentAmount) {
  if (paymentAmount === undefined || isNaN(paymentAmount)) {
    throw new Error('A valid payment amount is required.');
  }

  try {
    const franchise = await Franchise.findOne({ franchiseId, 'products._id': productId });
    if (!franchise) throw new Error('Franchise or product not found');
    
    const product = franchise.products.id(productId);
    if (!product) throw new Error('Product not found');

    const paymentPending = product.total - (product.paymentPaid || 0);

    if ((paymentAmount > 0 && paymentAmount > paymentPending) || (paymentAmount < 0 && Math.abs(paymentAmount) > product.paymentPaid)) {
      throw new Error(`Invalid payment amount: exceeds ${paymentAmount > 0 ? 'pending' : 'paid'} amount.`);
    }
    
    const updatedFranchise = await Franchise.findOneAndUpdate(
      { franchiseId, 'products._id': productId },
      {
        $inc: { 'products.$.paymentPaid': paymentAmount, 'products.$.paymentPending': -paymentAmount },
        $push: { 'products.$.payments': { amount: paymentAmount, date: new Date() } }
      },
      { new: true }
    );
    
    if (!updatedFranchise) throw new Error('Franchise or product not found');

    return updatedFranchise;
  } catch (error) {
    throw new Error(`Error updating payment: ${error.message}`);
  }
}

async function deleteFranchise(franchiseId) {
  try {
    const deletedFranchise = await Franchise.findOneAndDelete({ franchiseId });
    return deletedFranchise;
  } catch (error) {
    throw new Error(`Error deleting franchise: ${error.message}`);
  }
}

module.exports = {
  createFranchise,
  getAllFranchise,
  getFranchiseById,
  addSalesToFranchise,
  updateProductPayment,
  deleteFranchise, // Export the delete function
};
