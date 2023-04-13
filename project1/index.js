const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "camp23",
});
// get all data
app.get("/teams", (req, res) => {
  pool.query(`SELECT * FROM teams`, (err, result, fields) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  });
});
// add data
app.post("/teams", (req, res) => {
  pool.query(
    `INSERT INTO teams( name, trophies, points) VALUES ("${req.body.name}",${req.body.trophies},${req.body.points})`,
    (err, result, fields) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send("successful✅");
    }
  );
});
// updata data
app.patch("teams/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    `UPDATE teams SET name="${req.body.name}",trophies=${req.body.trophies},points=${req.body.points} WHERE id=${id}`,
    (err, result, fields) => {
      if (err) res.status(500).send(err);
      res.send("UPDATA SUCCESSFULL✅");
    }
  );
});

//delet data
app.delete("/teams/:id", (req, res) => {
  const { id } = req.params;
  pool.query(`DELETE FROM teams WHERE id==${id}`, (err, result, fields) => {
    if (err) res.status(500).send(err);
    res.send("DELETED SUCCESSFUL✅");
  });
});
app.listen(4000, () => {
  console.log("shoura on da code✅");
});
