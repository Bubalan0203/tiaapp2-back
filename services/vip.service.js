const Vip = require('../models/vip.model')

async function createVip(vipdata) {
    return await Vip.create(vipdata);
  }

  async function getAllVip() {
    return await Vip.find();
  }
  
module.exports={createVip,getAllVip}