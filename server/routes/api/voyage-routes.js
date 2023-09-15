const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
router.use(authMiddleware);

const {
  getVoyagesByUser,
  createVoyage,
} = require("../../controllers/voyage-controller");

// /api/voyages
router.route("/").post(createVoyage);

// /api/voyages/:userId
router.route("/:userId").get(getVoyagesByUser);

module.exports = router;
