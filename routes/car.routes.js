const { Router } = require("express");
const {
    getCars,
    getCarsById,
    addCar,
    updateCar,
    deleteCar,
} = require("../controllers/car.controller");
const router = Router();

router.get("/", getCars);
router.get("/:id", getCarsById);
router.post("/", addCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
module.exports = router;
