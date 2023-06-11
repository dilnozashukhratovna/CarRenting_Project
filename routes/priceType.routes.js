const { Router } = require("express");
const {
    getPriceTypes,
    getPriceTypesById,
    addPriceType,
    updatePriceType,
    deletePriceType,
} = require("../controllers/priceType.controller");
const router = Router();

router.get("/", getPriceTypes);
router.get("/:id", getPriceTypesById);
router.post("/", addPriceType);
router.put("/:id", updatePriceType);
router.delete("/:id", deletePriceType);
module.exports = router;
