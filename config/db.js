const mysql = require("mysql2");
require("dotenv").config();

const DB = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB,
});

// const query = `
// alter table medicines modify column expire_date varchar(20)
// `;

// DB.query(query, (error, result) => console.log(result));

module.exports = DB;
