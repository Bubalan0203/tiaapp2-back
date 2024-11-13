const Franchise = require('../models/franchise.model'); // Add this line

const franchiseservice = require('../services/franchise.service');

// Create a new franchise
async function createFranchise(req, res) {
  try {
    const franchise = await franchiseservice.createFranchise(req.body);
    res.status(201).json(franchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all franchises
async function getAllFranchise(req, res) {
  try {
    const franchises = await franchiseservice.getAllFranchise();
    res.json(franchises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a specific franchise by its franchiseId
async function getFranchiseById(req, res) {
  const { franchiseId } = req.params;

  try {
    const franchise = await franchiseservice.getFranchiseById(franchiseId);

    if (!franchise) {
      return res.status(404).json({ message: 'Franchise not found' });
    }

    res.status(200).json(franchise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add sales data to a specific franchise
async function addSalesData(req, res) {
  const { franchiseId } = req.params;  // Get franchiseId from the URL parameters
  const { products } = req.body;  // Get products array from the request body

  // Validate required fields
  if (!franchiseId || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedFranchise = await franchiseservice.addSalesToFranchise(franchiseId, products);

    res.status(200).json({
      message: 'Sales data added successfully.',
      franchise: updatedFranchise,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update payment for a product (Optional: Could be part of sales)
async function updatePayment(req, res) {
  try {
    const { franchiseId, productId } = req.params;
    const { amount } = req.body;

    // Validate that amount is a number
    if (amount === undefined || isNaN(amount)) {
      return res.status(400).json({ error: 'A valid payment amount is required.' });
    }

    // Find franchise by franchiseId
    const franchise = await Franchise.findOne({ franchiseId });

    if (!franchise) {
      return res.status(404).json({ error: 'Franchise not found' });
    }

    // Find product by productId in the products array
    const product = franchise.products.id(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const paymentPaid = product.paymentPaid || 0;
    const paymentPending = product.total - paymentPaid;

    // Check if positive payment exceeds the pending amount
    if (amount > 0 && amount > paymentPending) {
      return res.status(400).json({ error: 'Payment amount exceeds the pending payment.' });
    }

    // Check if negative payment exceeds the paid amount
    if (amount < 0 && Math.abs(amount) > paymentPaid) {
      return res.status(400).json({ error: 'Negative payment cannot exceed the amount already paid.' });
    }

    // Calculate the new payment amounts
    const newPaymentPaid = paymentPaid + amount;
    const newPaymentPending = product.total - newPaymentPaid;

    // Update product payment information
    product.paymentPaid = newPaymentPaid;
    product.paymentPending = newPaymentPending;

    // Add payment to the payments array
    product.payments.push({ amount, date: new Date() });

    // Save the updated franchise document
    await franchise.save();

    res.status(200).json({
      message: 'Payment updated successfully',
      payment: { amount, date: new Date() },
      product
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating payment: ' + error.message });
  }
}


module.exports = { createFranchise, getAllFranchise, getFranchiseById, addSalesData, updatePayment };
