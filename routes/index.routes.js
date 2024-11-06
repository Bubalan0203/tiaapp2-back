const franchiseRouter=require('./franchise.route')
const vipRouter = require('./vip.route');
const salesRouter=require('./sales.route');
const fsalesRouter = require('./fsales.route');

const router = require("express").Router();

router.use("/franchise",franchiseRouter)
router.use("/vip",vipRouter)
router.use("/sales",salesRouter)
router.use("/fsales",fsalesRouter)
module.exports={router};