const router = require("express").Router();

const { getVoyageData } = require("../../controllers/log-controller");

// /api/voyages/:voyageId
router.route("/:voyageId").get(getVoyageData);

module.exports = router;
