const DB = require("../config/db");

function getAllPharmacies(req, res) {
  const query = "select * from pharmacies order by name";
  DB.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ length: result.length, data: result });
  });
}

function getSinglePharmacy(req, res) {
  const id = req.params.id;
  const query = "select * from pharmacies where id = ?";
  DB.query(query, id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ error: "Pharmacy not found" });
    }
    res.json(result[0]);
  });
}

function addPharmacy(req, res) {
  const { name, address, location, phone, email, region_id, district_id } =
    req.body;
  const query =
    "insert into pharmacies(name, address, location, phone, email, region_id, district_id) values(?, ?, ?, ?, ?, ?, ?)";
  DB.query(
    query,
    [name, address, location, phone, email, region_id, district_id],
    (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "New Pharmacy Added" });
    }
  );
}

function updatePharmacy(req, res) {
  const pharId = req.params.id;
  DB.query("select * from pharmacies where id = ?", pharId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Pharmacy not found" });
    }

    const { name, address, location, phone, email, region_id, district_id } =
      req.body;
    const query =
      "update pharmacies set name = ?, address = ?, location = ?, phone = ?, email = ?, region_id = ?, district_id = ? where id = ?";
    DB.query(
      query,
      [name, address, location, phone, email, region_id, district_id, pharId],
      (error) => {
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ message: "Successfully Updated" });
      }
    );
  });
}

function deletePharmacy(req, res) {
  const pharId = req.params.id;
  DB.query("select * from pharmacies where id = ?", pharId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Pharmacy not found" });
    }

    const query = "delete from pharmacies where id = ?";
    DB.query(query, pharId, (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Deleted" });
    });
  });
}

module.exports = {
  getAllPharmacies,
  getSinglePharmacy,
  addPharmacy,
  updatePharmacy,
  deletePharmacy,
};
