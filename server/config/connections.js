const mysql = require("mysql2/promise");
require("dotenv").config();
// let db;

const db = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// if (process.env.JAWSDB_URL) {
//   db = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   db = mysql.createConnection({
//     host: "localhost",
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
// }

// db.connect((err) => {
//   if (err) throw err;
//   console.log(`Connected to the voyages_db database`);
// });

// exports.databaseConnection = db;
// module.exports = db.promise();
module.exports = db;
