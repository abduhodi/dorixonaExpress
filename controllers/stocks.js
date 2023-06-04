const DB = require("../config/db");

function getAllStocks(req, res) {
  const query = "select * from stock";
  DB.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "internal Server Error" });
    }
    res.json({ length: result.length, data: result });
  });
}

function getSingleStock(req, res) {
  const id = req.params.id;
  const query = "select * from stock where id = ?";
  DB.query(query, id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json(result[0]);
  });
}

function addStock(req, res) {
  const { pharmacy_id, medicine_id, quantity } = req.body;
  const query =
    "insert into stock(pharmacy_id, medicine_id, quantity) values(?, ?, ?)";
  DB.query(query, [pharmacy_id, medicine_id, quantity], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "New Stock Added" });
  });
}

function updateStock(req, res) {
  const stkId = req.params.id;
  DB.query("select * from stock where id = ?", stkId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }

    const { pharmacy_id, medicine_id, quantity } = req.body;
    const query =
      "update stock set pharmacy_id = ?, medicine_id = ?, quantity = ? where id = ?";
    DB.query(query, [pharmacy_id, medicine_id, quantity, stkId], (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Updated" });
    });
  });
}

function deleteStock(req, res) {
  const stkId = req.params.id;
  DB.query("select * from stock where id = ?", stkId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }
    const query = "delete from stock where id = ?";
    DB.query(query, stkId, (error) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Successfully Deleted" });
    });
  });
}

module.exports = {
  getAllStocks,
  getSingleStock,
  addStock,
  updateStock,
  deleteStock,
};
