const { authMiddleware } = require("../utils/auth");
const db = require("../config/connections").databaseConnection;

const logController = {
  // get single voyage by voyageId
  getVoyageData(req, res) {
    const sql = `SELECT v.voyageName, logDate, latitude, longitude, heading, notes FROM Voyages AS v INNER JOIN Log AS l ON v.voyageId = l.voyageId WHERE l.voyageId = ?`;
    const params = [req.params.voyageId];

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({
        message: "successfully",
        data: rows,
      });
    });
  },
};

module.exports = logController;
