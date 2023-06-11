const { Router } = require("express");
const {
    getRents,
    getRentsById,
    addRent,
    updateRent,
    deleteRent,
} = require("../controllers/rent.controller");
const router = Router();

router.get("/", getRents);
router.get("/:id", getRentsById);
router.post("/", addRent);
router.put("/:id", updateRent);
router.delete("/:id", deleteRent);
module.exports = router;
