const franchiseRouter=require('./franchise.route')
const vipRouter = require('./vip.route');
const salesRouter=require('./sales.route');
const fsalesRouter = require('./fsales.route');
const userRouter = require('./user.route');
const uploadRouter = require('./uploadvip.route')
const router = require("express").Router();

router.use("/franchise",franchiseRouter)
router.use("/vip",vipRouter)
router.use("/sales",salesRouter)
router.use("/fsales",fsalesRouter)
router.use("/users",userRouter)
router.use("/uploadvip",uploadRouter)
module.exports={router};