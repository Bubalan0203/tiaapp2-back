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
  }async function deleteSalesById(req, res) {
    try {
      const { id } = req.params; // Retrieve `id` from route parameters
      if (!id) {
        return res.status(400).json({ error: "ID is required to delete a record" });
      }
      const deletedRecord = await Salesservice.deleteSalesById(id);
      if (!deletedRecord.deletedCount) {
        return res.status(404).json({ error: "No record found with the provided ID" });
      }
      res.json({ message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = { 
    createSales, 
    getAllSales, 
    deleteSalesById 
  };
  