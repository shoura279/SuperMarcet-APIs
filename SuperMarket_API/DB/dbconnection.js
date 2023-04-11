const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "camp23",
});
module.exports = pool;
