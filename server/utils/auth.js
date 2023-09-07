const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;
const expiration = "2h";

module.exports = {
  signToken: function ({ userId, userName, userEmail }) {
    const payload = { userId, userName, userEmail };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
