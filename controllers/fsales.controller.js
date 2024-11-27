const Fsalesservice=require('../services/fsales.service')
async function createFsales(req, res) {
    try {
      const Fsales = await Fsalesservice.createFsales(req.body);
      res.status(201).json(Fsales);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async function getAllFsales(req, res) {
    try {
      const Fsales = await Fsalesservice.getAllFsales();
      res.json(Fsales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function deleteSalesById(req, res) {
    try {
      const { id } = req.params; // Retrieve `id` from route parameters
      if (!id) {
        return res.status(400).json({ error: "ID is required to delete a record" });
      }
      const deletedRecord = await Fsalesservice.deleteSalesById(id);
      if (!deletedRecord.deletedCount) {
        return res.status(404).json({ error: "No record found with the provided ID" });
      }
      res.json({ message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
module.exports={createFsales,getAllFsales,deleteSalesById}