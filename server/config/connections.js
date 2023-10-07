const mysql = require("mysql2/promise");
require("dotenv").config();
let db;

if (process.env.JAWSDB_URL) {
  db = mysql.createPool(process.env.JAWSDB_URL);
} else {
  db = mysql.createPool({
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
}

module.exports = db;
