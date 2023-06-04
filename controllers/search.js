const DB = require("../config/db");
const levenshteyn = require("fast-levenshtein");
const { absPath } = require("../utils/absPath");

function parseQueryBody(req, res) {
  try {
    const { name, region, district } = req.query;
    let query1 = "";
    let query2 = "";
    if (district !== "") {
      query1 = `select s.id, m.name, t.name type, m.price, m.expire_date, m.info, p.name pharmacy,
      p.phone, r.name region, d.name district, p.address, s.quantity
      from stock s join medicines m on s.medicine_id = m.id
      join pharmacies p on s.pharmacy_id = p.id join districts d on p.district_id = d.id
      join types t on m.type_id = t.id
      join regions r on d.region_id = r.id  
      where m.name regexp ? and r.name = ? and d.name = ? order by m.name limit 20`;
      query2 = `select s.id, m.name, t.name type, m.price, m.expire_date, m.info, p.name pharmacy,
      p.phone, r.name region, d.name district, p.address, s.quantity
      from stock s join medicines m on s.medicine_id = m.id
      join pharmacies p on s.pharmacy_id = p.id join districts d on p.district_id = d.id
      join types t on m.type_id = t.id
      join regions r on d.region_id = r.id
      where r.name = ? and d.name = ?`;
    } else if (region !== "") {
      query1 = `select s.id, m.name, t.name type, m.price, m.expire_date, m.info, p.name pharmacy,
      p.phone, r.name region, d.name district, p.address, s.quantity
      from stock s join medicines m on s.medicine_id = m.id
      join pharmacies p on s.pharmacy_id = p.id join districts d on p.district_id = d.id
      join types t on m.type_id = t.id
      join regions r on d.region_id = r.id  
      where m.name regexp ? and r.name = ? order by m.name limit 20 `;
      query2 = `select s.id, m.name, t.name type, m.price, m.expire_date, m.info, p.name pharmacy,
      p.phone, r.name region, d.name district, p.address, s.quantity
      from stock s join medicines m on s.medicine_id = m.id
      join pharmacies p on s.pharmacy_id = p.id join districts d on p.district_id = d.id
      join types t on m.type_id = t.id
      join regions r on d.region_id = r.id
      where r.name = ?`;
    } else {
      query1 = `select s.id, m.name, t.name type, m.price, m.expire_date, m.info, p.name pharmacy,
      p.phone, r.name region, d.name district, p.address, s.quantity
      from stock s join medicines m on s.medicine_id = m.id
      join pharmacies p on s.pharmacy_id = p.id join districts d on p.district_id = d.id
      join types t on m.type_id = t.id
      join regions r on d.region_id = r.id where m.name regexp ? order by m.name limit 20
      `;
      query2 = `select s.id, m.name, t.name type, m.price, m.expire_date, m.info, p.name pharmacy,
      p.phone, r.name region, d.name district, p.address, s.quantity
      from stock s join medicines m on s.medicine_id = m.id
      join pharmacies p on s.pharmacy_id = p.id join districts d on p.district_id = d.id
      join types t on m.type_id = t.id
      join regions r on d.region_id = r.id
      `;
    }

    DB.query(query1, [name, region, district], (error, result) => {
      if (error) {
        console.log("error query1");
        console.log(error);
        // return res.status(500).json({ error: "Internal Server Error" });
        return res.render(absPath("error"));
      } else if (result.length === 0) {
        DB.query(query2, [region, district], (error, result) => {
          if (error) {
            console.log("error query2");
            console.log(error);
            // return res.status(500).json({ error: "Internal Server Error" });
            return res.render(absPath("error"));
          } else {
            try {
              const data = result.filter((medicine) => {
                medicine.levenshteyn = levenshteyn.get(name, medicine.name, {
                  useCollator: true,
                });
                return medicine.levenshteyn < medicine.name.length * 0.7;
              });
              if (data.length === 0) {
                // return res
                //   .status(404)
                //   .json({ error: "Medicine not found with given name" });
                console.log("length 0 error");
                return res.render(absPath("index"), { data: [] });
              } else {
                data.sort((a, b) => a.levenshteyn - b.levenshteyn);
                // return res.json({ data: data.slice(0, 20) });
                return res.render(absPath("index"), { data });
              }
            } catch (error) {
              console.log(error);
              // return res.status(500).json({ error: "Internal Server Error" });
              return res.render(absPath("error"));
            }
          }
        });
      } else {
        // res.json({ data: result });
        return res.render(absPath("index"), { data: result });
      }
    });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ error: "Internal Server Error" });
    return res.render(absPath("error"));
  }
}

module.exports = {
  parseQueryBody,
};
