const DB = require("../config/db");

function getAllMedicines(req, res) {
  const query = "select * from medicines order by name";
  DB.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ length: result.length, data: result });
  });
}

function getSingleMedicine(req, res) {
  const id = req.params.id;
  const query = "select * from medicines where id = ?";
  DB.query(query, id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.json(result[0]);
  });
}

function addMedicine(req, res) {
  const { name, manufacturer, type_id, price, expire_date, info } = req.body;
  const query =
    "insert into medicines(name, manufacturer, type_id, price, expire_date, info) values(?, ?, ?, ?, ?, ?)";
  DB.query(
    query,
    [name, manufacturer, type_id, price, expire_date, info],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "New Medicine Added" });
    }
  );
}

function updateMedicine(req, res) {
  const medId = req.params.id;
  DB.query("select * from medicines where id = ?", medId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    const { name, manufacturer, type_id, price, expire_date, info } = req.body;
    const query =
      "update medicines set name = ?, manufacturer = ?, type_id = ?, price = ?, expire_date = ?, info = ? where id = ?";
    DB.query(
      query,
      [name, manufacturer, type_id, price, expire_date, info, medId],
      (error) => {
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ message: "Successfully Updated" });
      }
    );
  });
}

function deleteMedicine(req, res) {
  const medId = req.params.id;
  DB.query("select * from medicines where id = ?", medId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    const query = "delete from medicines where id = ?";
    DB.query(query, medId, (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Deleted" });
    });
  });
}

module.exports = {
  getAllMedicines,
  getSingleMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};
