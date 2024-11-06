const Fsales = require('../models/fsales.model')
async function createFsales(fsalesdata) {
    return await Fsales.create(fsalesdata);
  }
  async function getAllFsales() {
    return await Fsales.find();
  }
module.exports={createFsales,getAllFsales}