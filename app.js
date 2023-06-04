const express = require("express");
const app = express();
require("dotenv").config();

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Engine
app.set("view engine", "ejs");

// Set static files
app.set(express.static("views"));

// Mount routes
app.use("/", require("./routes"));

const port = process.env.PORT || 3333;
app.listen(port, console.log(`Server running on port ${port}`));
