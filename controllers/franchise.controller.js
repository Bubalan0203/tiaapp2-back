const franchiseservice = require('../services/franchise.service');

async function createFranchise(req, res) {
  try {
    const franchise = await franchiseservice.createFranchise(req.body);
    res.status(201).json(franchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllFranchise(req, res) {
  try {
    const franchises = await franchiseservice.getAllFranchise();
    res.json(franchises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFranchiseById(req, res) {
  const { franchiseId } = req.params;

  try {
    const franchise = await franchiseservice.getFranchiseById(franchiseId);
    if (!franchise) return res.status(404).json({ message: 'Franchise not found' });

    res.status(200).json(franchise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addSalesData(req, res) {
  const { franchiseId } = req.params;
  const { products } = req.body;

  if (!franchiseId || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedFranchise = await franchiseservice.addSalesToFranchise(franchiseId, products);
    res.status(200).json({ message: 'Sales data added successfully.', franchise: updatedFranchise });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updatePayment(req, res) {
  try {
    const { franchiseId, productId } = req.params;
    const { amount } = req.body;

    if (amount === undefined || isNaN(amount)) {
      return res.status(400).json({ error: 'A valid payment amount is required.' });
    }

    const updatedFranchise = await franchiseservice.updateProductPayment(franchiseId, productId, amount);
    res.status(200).json({ message: 'Payment updated successfully', payment: { amount, date: new Date() }, franchise: updatedFranchise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createFranchise, getAllFranchise, getFranchiseById, addSalesData, updatePayment };
