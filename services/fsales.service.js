const Fsales = require('../models/fsales.model')
async function createFsales(fsalesdata) {
    return await Fsales.create(fsalesdata);
  }
  async function getAllFsales() {
    return await Fsales.find();
  }
  async function deleteSalesById(id) {
    return await Fsales.deleteOne({ _id: id });
  }
module.exports={createFsales,getAllFsales,deleteSalesById}