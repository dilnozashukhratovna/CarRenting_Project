const { Router } = require("express");
const {
    getClients,
    getClientsById,
    addClient,
    updateClient,
    deleteClient,
} = require("../controllers/client.contoller");
const router = Router();

router.get("/", getClients);
router.get("/:id", getClientsById);
router.post("/", addClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
module.exports = router;
