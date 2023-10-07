const validate = (email, password) => {
  // email validation
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validEmail = emailRegex.test(email);
  // password validation
  const pwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const validPassword = pwordRegex.test(password);

  if (!validEmail || !validPassword) {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  // email validation
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    return false;
  }
  return true;
};

const validatePassword = (password) => {
  // password validation
  const pwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const validPassword = pwordRegex.test(password);

  if (!validPassword) {
    return false;
  }
  return true;
};

module.exports = { validate, validateEmail, validatePassword };

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
