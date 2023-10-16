const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
router.use(authMiddleware);

const {
  getVoyageData,
  createLog,
  deleteLog,
  getSingleLog,
} = require("../../controllers/log-controller");

// /api/log/:voyageId
router.route("/:voyageId").get(getVoyageData);

// /api/log
router.route("/").post(createLog);

// /api/log/del
router.route("/del").put(deleteLog);

// /api/log/single/:logid
router.route("/single/:logId").get(getSingleLog);

module.exports = router;
