const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req, res, next }) {
    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(" ")[1];
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(401);
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      return res.status(403);
    }
    next();
  },

  signToken: function ({ userId, userName, userEmail }) {
    const payload = { userId, userName, userEmail };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
