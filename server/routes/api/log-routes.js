const router = require("express").Router();

const {
  getVoyageData,
  createLog,
} = require("../../controllers/log-controller");

// /api/log/:voyageId
router.route("/:voyageId").get(getVoyageData);

// /api/log
router.route("/").post(createLog);

module.exports = router;
