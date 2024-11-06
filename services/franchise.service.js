const Franchise = require('../models/franchise.model')
async function createFranchise(franchisedata) {
    return await Franchise.create(franchisedata);
  }
  async function getAllFranchise() {
    return await Franchise.find();
  }
module.exports={createFranchise,getAllFranchise}