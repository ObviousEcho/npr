const router = require("express").Router();

const {
  getUsers,
  createUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getUsers);

// /api/users/signup
router.route("/signup").post(createUser);

// /api/users/login
router.route("/login").post(loginUser);

// /api/users/newpassword
router.route("/requestpassword").post(requestPasswordReset);

// /api/users/resetpassword
router.route("/resetpassword").post(resetPassword);

module.exports = router;
