const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { validate, validateEmail } = require("../utils/helpers");
const { signToken } = require("../utils/auth");
const db = require("../config/connections").databaseConnection;

const userController = {
  // get all users
  async getUsers(req, res) {
    const sql = `SELECT * FROM Users`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  },

  // create new user
  async createUser({ body }, res) {
    // validator helper function
    if (!validate(body.userEmail, body.userPassword)) {
      res
        .status(400)
        .json({ errors: "Invalid credentials!", message: "Please try again." });
      return;
    }
    const userName = body.userName;
    const userEmail = body.userEmail;

    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(body.userPassword, 10);

    const sql = `INSERT INTO Users (userName, userEmail, userPassword) VALUES (?, ?, ?)`;
    const params = [userName, userEmail, hashedPassword];

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      // compile jwt payload
      const userId = rows.insertId;
      const profile = {
        userId: userId,
        userName: userName,
        userEmail: userEmail,
      };
      // sign jwt
      const token = signToken(profile);
      res.json({
        message: "success",
        token: token,
        data: rows,
      });
    });
  },

  // login existing user
  async loginUser({ body }, res) {
    if (!validate(body.userEmail, body.userPassword)) {
      res
        .status(400)
        .json({ error: "Invalid credentials!", message: "Please try again." });
      return;
    }

    const sql = `SELECT userId, userName, userEmail, userPassword FROM Users WHERE userEmail = ?`;
    const params = [body.userEmail];

    db.query(sql, params, async (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      // compare user password with password stored in db
      const validPassword = await bcrypt.compare(
        body.userPassword,
        rows[0].userPassword
      );

      if (validPassword) {
        // compile jwt payload
        const userId = rows[0].userId;
        const userName = rows[0].userName;
        const userEmail = rows[0].userEmail;
        const profile = {
          userId: userId,
          userName: userName,
          userEmail: userEmail,
        };
        // sign jwt
        const token = signToken(profile);

        res.json({
          message: "success",
          token: token,
        });
      } else {
        res.json({ message: "something went wrong!" });
      }
    });
  },

  async locateUser({ body }, res) {
    // validate user entered email
    if (!validateEmail(body.userEmail)) {
      res
        .status(400)
        .json({ error: "Invalid credentials!", message: "Please try again." });
      return;
    }

    // create and hash reset token
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(resetToken, 10);

    // query Users for entered email
    let sql = `SELECT userId, userEmail FROM Users WHERE userEmail = ?`;
    let params = body.userEmail;

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      // if userEmail not found return error
      if (rows.length === 0) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      // query Token with returned user
      const userId = rows[0].userId;
      sql = `SELECT userId, token, createdAt FROM Token WHERE userId = ?`;

      db.query(sql, userId, (err, rows) => {
        if (err) {
          res.status(404).json({ error: err.message });
          return;
        }

        // delete reset token if exists
        if (rows !== 0) {
          sql = `DELETE from Token WHERE userId = ?`;

          db.query(sql, userId, (err, rows) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }

            res.json({ message: "made it this far!", token: hashedPassword });
            return;
          });
        }
      });
    });
  },
};

module.exports = userController;
