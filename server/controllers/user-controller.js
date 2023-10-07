const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { validateEmail, validatePassword } = require("../utils/helpers");
const { signToken } = require("../utils/auth");
// const db = require("../config/connections").databaseConnection;
const db = require("../config/connections");
const sendEmail = require("../utils/sendEmail");

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
    if (
      !validateEmail(body.userEmail) &&
      !validatePassword(body.userPassword)
    ) {
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
    if (
      !validateEmail(body.userEmail) &&
      !validatePassword(body.userPassword)
    ) {
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

  // request password reset
  async requestPasswordReset({ body }, res) {
    const userEmail = body.userEmail;

    // validate user entered email
    if (!validateEmail(userEmail)) {
      res
        .status(400)
        .json({ error: "Invalid credentials!", message: "Please try again." });
      return;
    }

    try {
      // query Users for entered email
      let sql = `SELECT userId, userName, userEmail FROM Users WHERE userEmail = ?`;
      let params = [userEmail];

      const [data] = await db.execute(sql, params);

      // throw error if not found
      if (data.length === 0) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      const userId = data[0].userId;
      const userName = data[0].userName;

      // query Token with returned user
      sql = `SELECT userId, token, createdAt FROM Token WHERE userId = ?`;
      params = [userId];

      const [rows] = await db.execute(sql, params);

      // delete old reset token if one exists
      if (rows !== 0) {
        sql = `DELETE FROM Token WHERE userId = ?`;
        params = [userId];

        const [delRows] = await db.execute(sql, params);
      }

      // create and hash reset token
      let resetToken = crypto.randomBytes(32).toString("hex");
      const hashedResetToken = await bcrypt.hash(resetToken, 10);

      // save new reset token to database
      sql = `INSERT INTO Token (userId, token) VALUES (?, ?)`;
      params = [userId, hashedResetToken];

      const [results] = await db.execute(sql, params);

      // link to reset password containing token
      const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${userId}`;

      // send email with link to reset password
      sendEmail(
        userEmail,
        "Password Reset Request",
        {
          name: userName,
          link: link,
        },
        "./template/requestResetPassword.handlebars"
      );

      res.status(200).json({
        message: "Success",
      });

      // handle errors
    } catch (err) {
      console.log(`Error: ${err.message}`);
      res.status(400).json({
        error: err.message,
        message: "Something went wrong.",
      });
    }
  },

  // password reset
  async resetPassword({ body }, res) {
    const token = body.token;
    const userId = body.userId;
    const userPassword = body.userPassword;

    if (!validatePassword(userPassword)) {
      res.status(400).json({
        error: "Invalid entry!",
        message:
          "Passwords must contain upper and lower case, numbers and special characters (!@#$%^&*).",
      });
      return;
    }

    try {
      // query Token for matching userId
      let sql = `SELECT token FROM Token WHERE userId = ?`;
      let params = [userId];

      const [data] = await db.execute(sql, params);
      const dbToken = data[0].token;

      // compare token from email with token stored in database
      const isValid = await bcrypt.compare(token, dbToken);

      // throw error if invalid
      if (!isValid) {
        throw new Error("Invalid or expired reset token.");
      }

      // if valid hash new password
      const hash = await bcrypt.hash(userPassword, 10);

      // update User password with new password
      sql = `UPDATE Users SET userPassword = ? WHERE userId = ?`;
      params = [hash, userId];

      const [results] = await db.execute(sql, params);

      // delete reset token from database
      sql = `DELETE FROM Token WHERE userId = ?`;
      params = [userId];

      const [rows] = await db.execute(sql, params);

      // resolve request
      res.json({
        message: "Success",
      });

      // handle errors
    } catch (err) {
      console.log(`Err: ${err.message}`);
      res.status(400).json({
        error: err.message,
        message: "Something went wrong",
      });
    }
  },
};

module.exports = userController;
