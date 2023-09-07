const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { validate, hashed } = require("../utils/helpers");
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

router.post("/signup", async ({ body }, res) => {
  // validator helper function
  if (!validate(body.userEmail, body.userPassword)) {
    res.status(400).json({ error: "Invalid credentials!" });
    return;
  }

  // hash password using bcrypt
  const hashedPassword = await bcrypt.hash(body.userPassword, 10);

  const sql = `INSERT INTO Users (userName, userEmail, userPassword) VALUES (?, ?, ?)`;
  const params = [body.userName, body.userEmail, hashedPassword];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
    });
  });
});

router.post("/login", ({ body }, res) => {
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
      // sign JWT
      res.json({
        message: "success",
        // data: JWT,
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
