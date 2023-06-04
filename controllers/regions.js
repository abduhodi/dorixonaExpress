const DB = require("../config/db");

function getAllRegions(req, res) {
  const query = "select * from regions order by name";
  DB.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "internal Server Error" });
    }
    res.json({ length: result.length, data: result });
  });
}

function getSingleRegion(req, res) {
  const id = req.params.id;
  const query = "select * from regions where id = ?";
  DB.query(query, id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ error: "Region not found" });
    }
    res.json(result[0]);
  });
}

function addRegion(req, res) {
  const { id, name } = req.body;
  const query = "insert into regions values(?, ?)";
  DB.query(query, [id, name], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "New Region Added" });
  });
}

function updateRegion(req, res) {
  const regId = req.params.id;
  DB.query("select * from regions where id = ?", regId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Region not found" });
    }

    const { id, name } = req.body;
    const query = "update regions set id = ?, name = ? where id = ?";
    DB.query(query, [id, name, regId], (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Updated" });
    });
  });
}

function deleteRegion(req, res) {
  const regId = req.params.id;
  DB.query("select * from regions where id = ?", regId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Region not found" });
    }
    const query = "delete from regions where id = ?";
    DB.query(query, regId, (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Deleted" });
    });
  });
}

module.exports = {
  getAllRegions,
  getSingleRegion,
  addRegion,
  updateRegion,
  deleteRegion,
};
