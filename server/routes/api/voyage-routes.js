const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
router.use(authMiddleware);

const {
  getVoyagesByUser,
  createVoyage,
  deleteVoyage,
  updateVoyage,
} = require("../../controllers/voyage-controller");

// /api/voyages
router.route("/").post(createVoyage);

// /api/voyages/:userId
router.route("/:userId").get(getVoyagesByUser);

// /api/voyages/:voyageId
router.route("/:voyageId").delete(deleteVoyage);

// /api/voyages/:voyageId
router.route("/:voyageId").put(updateVoyage);

module.exports = router;
