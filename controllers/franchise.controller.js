const franchiseservice=require('../services/franchise.service')
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
      const franchise = await franchiseservice.getAllFranchise();
      res.json(franchise);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
module.exports={createFranchise,getAllFranchise}