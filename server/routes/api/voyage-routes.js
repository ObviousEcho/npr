const router = require("express").Router();

const {
  getVoyagesByUser,
  getSingleVoyage,
  createVoyage,
} = require("../../controllers/voyage-controller");

// /api/voyages
router.route("/").post(createVoyage);

// /api/voyages/:userId
router.route("/:userId").get(getVoyagesByUser);

// /api/voyages/:voyageId
router.route("/:voyagesId").get(getSingleVoyage);

module.exports = router;
