const db = require("../config/connections").databaseConnection;

const logController = {
  // get single voyage by voyageId
  getVoyageData(req, res) {
    const sql = `SELECT v.voyageName, logDate, time, latitude, longitude, heading, notes FROM Voyages AS v INNER JOIN Log AS l ON v.voyageId = l.voyageId WHERE l.voyageId = ?`;
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

  createLog({ body }, res) {
    const sql = `INSERT INTO Log (voyageId, logDate, time, latitude, longitude, heading, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      body.voyageId,
      body.logDate,
      body.time,
      body.latitude,
      body.longitude,
      body.heading,
      body.notes,
    ];

    db.query(sql, params, (err, rows) => {
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
};

module.exports = logController;
