const franchiseRouter=require('./franchise.route')
const vipRouter = require('./vip.route');
const salesRouter=require('./sales.route');
const fsalesRouter = require('./fsales.route');
const userRouter = require('./user.route');
const uploadRouter = require('./uploadvip.route')
const uploadvipfranchiseRouter =require('./uploadvipfranchise.route')
const router = require("express").Router();
const horouter = require('./ho.route');
const productRouter = require('./product.route');
const uploadvipRouter =require('./uploadvipdata.route');
const uploadCompanyRouter = require('./company.route');
const viprouter = require('./uploadvip.route')

router.use("/vip1",viprouter)
router.use("/vipdata",uploadvipRouter)
router.use("/companydata",uploadCompanyRouter)
router.use("/product",productRouter)
router.use("/hostaff",horouter)
router.use("/franchise",franchiseRouter)

router.use("/vip",vipRouter)

router.use("/sales",salesRouter)

router.use("/fsales",fsalesRouter)

router.use("/users",userRouter)

router.use("/uploadvip",uploadRouter)
router.use("/vipfranchiseupload",uploadvipfranchiseRouter)
module.exports={router};