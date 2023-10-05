const router = require("express").Router();

const {
  getUsers,
  createUser,
  loginUser,
  locateUser,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getUsers);

// /api/users/signup
router.route("/signup").post(createUser);

// /api/users/login
router.route("/login").post(loginUser);

router.route("/newpassword").post(locateUser);

module.exports = router;
