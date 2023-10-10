const db = require("../config/connections");

const voyageController = {
  // get all voyages by user
  async getVoyagesByUser(req, res) {
    try {
      const sql = `SELECT voyageId, voyageName FROM Voyages WHERE userId = ?`;
      const params = [req.params.userId];

      const [data] = await db.execute(sql, params);

      res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        message: "Unable to perform request.",
      });
    }
  },

  // create new voyage for user
  async createVoyage({ body }, res) {
    try {
      const sql = `INSERT INTO Voyages (userId, voyageName) VALUES (?, ?)`;
      const params = [body.userId, body.voyageName];

      const [data] = await db.execute(sql, params);

      res.json({
        message: "success",
        data: data.insertId,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "Please try again.",
      });
    }
  },
};

module.exports = voyageController;
