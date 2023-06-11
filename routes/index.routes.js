const { Router } = require("express");
const router = Router();

const clientRouter = require("./client.routes");
const carRouter = require("./car.routes");
const priceTypeRouter = require("./priceType.routes");
const rentRouter = require("./rent.routes");



router.use("/api/client", clientRouter);
router.use("/api/car", carRouter);    
router.use("/api/price", priceTypeRouter);    
router.use("/api/rent", rentRouter);    


module.exports = router;
