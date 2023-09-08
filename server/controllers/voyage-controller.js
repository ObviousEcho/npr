const { authMiddleware } = require("../utils/auth");
const db = require("../config/connections").databaseConnection;

const voyageController = {
  // get all voyages by user
  getVoyagesByUser(req, res) {
    const sql = `SELECT voyageId, voyageName FROM Voyages WHERE uId = ?`;
    const params = [req.params.userId];

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

  // get single voyage by voyageId
  async getSingleVoyage(req, res) {},

  // create new voyage for user
  async createVoyage(req, res) {},
};

module.exports = voyageController;
