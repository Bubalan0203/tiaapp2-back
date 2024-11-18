const Vipservice=require('../services/vip.service')

async function createVip(req, res) {
    try {
      const vip = await Vipservice.createVip(req.body);
      res.status(201).json(vip);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async function getAllVip(req, res) {
    try {
      const vip = await Vipservice.getAllVip();
      res.json(vip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
module.exports={createVip,getAllVip}