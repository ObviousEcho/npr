const db = require("../config/connections");

const voyageController = {
  // get all voyages by user
  async getVoyagesByUser(req, res) {
    try {
      const sql = `SELECT voyageId, voyageName FROM Voyages WHERE userId = ?`;
      const params = [req.params.userId];

      const [data] = await db.execute(sql, params);

      res.json({
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

  // delete voyage
  async deleteVoyage(req, res) {
    try {
      const { voyageId } = req.params;
      const sql = `DELETE FROM Voyages WHERE voyageId = ?`;
      const params = [voyageId];

      const [data] = await db.execute(sql, params);

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

  // update voyage title
  async updateVoyage(req, res) {
    try {
      const { voyageId } = req.params;
      const { newTitle } = req.body;
      const sql = `UPDATE Voyages SET voyageName = ? WHERE voyageId = ?`;
      const params = [newTitle, voyageId];

      const [data] = await db.execute(sql, params);

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

module.exports = voyageController;
