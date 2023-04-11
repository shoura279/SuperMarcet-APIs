const router = require("express").Router();
const conn = require("../DB/dbconnection");
const util = require("util");

//ADD PRODUCT TO DB
router.post("/products", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    await query(
      `INSERT INTO 180daraga_market ( product_name, product_value, product_quantity) VALUES ("${req.body.product_name}",${req.body.product_value},${req.body.product_quantity})`
    );
    res.send("SUCCESS");
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
//RETURN ALL PRODUCT
router.get("/products", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const data = await query(`SELECT * FROM 180daraga_market`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
module.exports = router;
