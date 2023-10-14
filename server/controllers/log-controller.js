const db = require("../config/connections");
const { v4: uuidv4 } = require("uuid");

const logController = {
  // get single voyage by voyageId
  async getVoyageData(req, res) {
    try {
      let sql = `SELECT voyageName FROM Voyages WHERE voyageId = ?`;
      const params = [req.params.voyageId];

      const [response] = await db.execute(sql, params);

      sql = `SELECT v.voyageName, logId, logDate, time, latitude, longitude, heading, notes FROM Voyages AS v INNER JOIN Log AS l ON v.voyageId = l.voyageId WHERE l.voyageId = ?`;

      const [data] = await db.execute(sql, params);

      res.json({
        message: "successfully",
        res: { data, response },
        // data: data,
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
      const sql = `INSERT INTO Log (voyageId, logId, logDate, time, latitude, longitude, heading, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        body.voyageId,
        uuidv4(),
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

  // delete log entry
  async deleteLog({ body }, res) {
    try {
      const { logId } = body;
      console.log(logId);
      const sql = `DELETE FROM Log WHERE logId = ?`;
      const params = [logId];

      const [data] = await db.execute(sql, params);
      console.log(data);

      res.json({
        message: "success",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        message: "Unable to complete request.",
      });
    }
  },
};

module.exports = logController;
