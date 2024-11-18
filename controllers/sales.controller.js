const Salesservice=require('../services/sales.service')

async function createSales(req, res) {
    try {
      const Sales = await Salesservice.createSales(req.body);
      res.status(201).json(Sales);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async function getAllSales(req, res) {
    try {
      const Sales = await Salesservice.getAllSales();
      res.json(Sales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
module.exports={createSales,getAllSales}