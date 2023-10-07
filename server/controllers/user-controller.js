const bcrypt = require("bcrypt");
const crypto = require("crypto");

const {
  validate,
  validateEmail,
  validatePassword,
} = require("../utils/helpers");
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

  // request password reset
  // CALLBACK HELL!!
  // mysql2 npm package doesn't support promises, next time use mysql2-async
  async requestPasswordReset({ body }, res) {
    const userEmail = body.userEmail;

    // validate user entered email
    if (!validateEmail(userEmail)) {
      res
        .status(400)
        .json({ error: "Invalid credentials!", message: "Please try again." });
      return;
    }

    // create and hash reset token
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(resetToken, 10);

    // query Users for entered email
    let sql = `SELECT userId, userName, userEmail FROM Users WHERE userEmail = ?`;
    let params = userEmail;

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
      const userName = rows[0].userName;

      sql = `SELECT userId, token, createdAt FROM Token WHERE userId = ?`;

      db.query(sql, userId, (err, rows) => {
        if (err) {
          res.status(404).json({ error: err.message });
          return;
        }

        // delete old reset token if exists in database
        if (rows !== 0) {
          sql = `DELETE from Token WHERE userId = ?`;

          db.query(sql, userId, (err, rows) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }

            // save new hashed token to database
            sql = `INSERT INTO Token (userId, token) VALUES (?, ?)`;
            let params = [userId, hashedPassword];
            db.query(sql, params, (err, rows) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }

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

              return res.json({
                message: "Success",
              });
            });
          });
        }
      });
    });
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

    // query Token for matching userId
    let sql = `SELECT token FROM Token WHERE userId = ?`;
    let params = [userId];

    const [rows] = await db.execute(sql, params);
    console.log(rows);

    // db.execute(sql, params)
    //   .then(([data]) => {
    //     return data;
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },

  // async resetPassword({ body }, res) {
  //   const token = body.token;
  //   const userId = body.userId;
  //   const userPassword = body.userPassword;

  //   if (!validatePassword(userPassword)) {
  //     res.status(400).json({
  //       error: "Invalid entry!",
  //       message:
  //         "Passwords must contain upper and lower case, numbers and special characters (!@#$%^&*).",
  //     });
  //     return;
  //   }

  //   // query Token for matching userId
  //   let sql = `SELECT token FROM Token WHERE userId = ?`;
  //   let params = userId;

  //   db.query(sql, params, (err, rows) => {
  //     if (err) {
  //       res.status(500).json(err.message);
  //     }
  //     let dbToken = rows[0].token;

  //     // compare token from email with token stored in database
  //     const isValid = await bcrypt.compare(token, dbToken);
  //     const hash = await bcrypt.hash(userPassword, 10);

  //     if (!isValid) {
  //       throw new Error("Invalid or expired reset token.")
  //     }

  //     // if valid update user password in database
  //     sql = `UPDATE Users SET userPassword = ? WHERE userId = ?`;
  //     // params = [hash, userId];

  //     // db.query(sql, params, (err, rows) => {
  //     //   if (err) {
  //     //     res.status(500).json(err.message);
  //     //   }

  //     // delete reset token from database
  //     // let sql = `DELETE FROM Token WHERE userId = ?`;
  //     // let params = userId;

  //     // db.query(sql, params, (err, rows) => {
  //     //   if (err) {
  //     //     res.status(500).json({ error: err.message });
  //     //     return;
  //     //   }

  //     // });
  //     //   res.json({
  //     //     message: "Success",
  //     //   });
  //     // });
  //   });
  // },
};

module.exports = userController;
