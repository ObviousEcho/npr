const db = require("../config/connections");

const logController = {
  // get single voyage by voyageId
  async getVoyageData(req, res) {
    try {
      const sql = `SELECT v.voyageName, logDate, time, latitude, longitude, heading, notes FROM Voyages AS v INNER JOIN Log AS l ON v.voyageId = l.voyageId WHERE l.voyageId = ?`;
      const params = [req.params.voyageId];

      const [data] = await db.execute(sql, params);

      res.json({
        message: "successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        message: "Unable to perform request.",
      });
    }
  },

  // create new log data for a voyage
  async createLog({ body }, res) {
    try {
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

      const [data] = await db.execute(sql, params);

      res.json({
        message: "success",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "Something went worng, please try again.",
      });
    }
  },
};

module.exports = logController;
