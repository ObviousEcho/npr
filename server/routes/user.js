const express = require("express");
const router = express.Router();

const db = require("../config/connections").databaseConnection;

router.get("/", (req, res) => {
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
});

router.post("/signup", ({ body }, res) => {
  // email validation
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validEmail = emailRegex.test(body.userEmail);
  // password validation
  const pwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const validPassword = pwordRegex.test(body.userPassword);

  if (!validEmail || !validPassword) {
    res.status(400).json({ error: "Invalid credentials!" });
    return;
  }

  // use bcrypt to hash password

  const sql = `INSERT INTO Users (userName, userEmail, userPassword) VALUES (?, ?, ?)`;
  const params = [body.userName, body.userEmail, body.userPassword];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

router.post("/login", ({ body }, res) => {
  const sql = `SELECT userId, userName, userEmail, userPassword FROM Users WHERE userEmail = ?`;
  const params = [body.userEmail];

  db.query(sql, params, (err, rows) => {
    // use bcrpyt to validate password
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    // sign JWT
    if (body.userPassword === rows[0].userPassword) {
      res.json({
        message: "success",
        data: body,
      });
    } else {
      res.json({ message: "something went wrong!" });
    }
  });
});

router.post("/logout", (req, res) => {
  // remove JWT
});

module.exports = router;
