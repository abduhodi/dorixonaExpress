const DB = require("../config/db");

function getAllDistricts(req, res) {
  const { region } = req.query;
  if (region) {
    const query =
      "select d.id, d.name from districts d join regions r on d.region_id = r.id where r.name = ? order by d.name";
    DB.query(query, region, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "internal Server Error" });
      }
      res.json({ length: result.length, data: result });
    });
  } else {
    const query = "select * from districts";
    DB.query(query, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "internal Server Error" });
      }
      res.json({ length: result.length, data: result });
    });
  }
}

function getSingleDistrict(req, res) {
  const id = req.params.id;
  const query = "select * from districts where id = ?";
  DB.query(query, id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ error: "District not found" });
    }
    res.json(result[0]);
  });
}

function addDistrict(req, res) {
  const { name, region_id } = req.body;
  const query = "insert into districts(name, region_id) values(?, ?)";
  DB.query(query, [name, region_id], (error) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "New District Added" });
  });
}

function updateDistrict(req, res) {
  const disId = req.params.id;
  DB.query("select * from districts where id = ?", disId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "District not found" });
    }

    const { name, region_id } = req.body;
    const query = "update districts set name = ?, region_id = ? where id = ?";
    DB.query(query, [name, region_id, disId], (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Updated" });
    });
  });
}

function deleteDistrict(req, res) {
  const disId = req.params.id;
  DB.query("select * from districts where id = ?", disId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "District not found" });
    }
    const query = "delete from districts where id = ?";
    DB.query(query, disId, (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Deleted" });
    });
  });
}

module.exports = {
  getAllDistricts,
  getSingleDistrict,
  addDistrict,
  updateDistrict,
  deleteDistrict,
};
