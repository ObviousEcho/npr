const router = require("express").Router();
const userRoutes = require("./user-routes");
const voyageRoutes = require("./voyage-routes");
const logRoutes = require("./log-routes");

router.use("/users", userRoutes);
router.use("/voyages", voyageRoutes);
router.use("/log", logRoutes);

module.exports = router;
