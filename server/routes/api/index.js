const router = require("express").Router();
const userRoutes = require("./user-routes");
const voyageRoutes = require("./voyage-routes");

router.use("/users", userRoutes);
router.use("/voyages", voyageRoutes);

module.exports = router;
