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
module.exports={createFsales,getAllFsales}