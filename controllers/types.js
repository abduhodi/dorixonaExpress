const DB = require("../config/db");

function getAllTypes(req, res) {
  const query = "select * from types order by name";
  DB.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "internal Server Error" });
    }
    res.json({ length: result.length, data: result });
  });
}

function getSingleType(req, res) {
  const id = req.params.id;
  const query = "select * from types where id = ?";
  DB.query(query, id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ error: "Type not found" });
    }
    res.json(result[0]);
  });
}

function addType(req, res) {
  const { name } = req.body;
  const query = "insert into types(name) values(?)";
  DB.query(query, name, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "New Type Added" });
  });
}

function updateType(req, res) {
  const typeId = req.params.id;
  DB.query("select * from types where id = ?", typeId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Type not found" });
    }

    const { name } = req.body;
    const query = "update types set name = ? where id = ?";
    DB.query(query, [name, typeId], (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Updated" });
    });
  });
}

function deleteType(req, res) {
  const typeId = req.params.id;
  DB.query("select * from types where id = ?", typeId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Type not found" });
    }
    const query = "delete from types where id = ?";
    DB.query(query, typeId, (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Deleted" });
    });
  });
}

module.exports = {
  getAllTypes,
  getSingleType,
  addType,
  updateType,
  deleteType,
};
