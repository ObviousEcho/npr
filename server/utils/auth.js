const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: async function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      res
        .status(400)
        .json({ success: false, message: "Error!  Token was not provided!" });
      return;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid token!" });
    }
  },

  signToken: function ({ userId, userName, userEmail }) {
    const payload = { userId, userName, userEmail };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
