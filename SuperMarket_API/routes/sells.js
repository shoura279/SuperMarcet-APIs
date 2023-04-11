const util = require("util");
const router = require("express").Router();
const { query } = require("express");
const conn = require("../DB/dbconnection");
router.post("/sells", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    await query(
      `INSERT INTO thecamp_market_sells ( product_id, sells_quantity) VALUES (${req.body.product_id},${req.body.sells_quantity})`
    );
    const data = await query(
      `SELECT cnt FROM 180daraga_market WHERE id = ${req.body.product_id}`
    );
    // console.log(data[0].cnt);
    data[0].cnt += req.body.sells_quantity;
    // console.log(data[0].cnt);
    await query(
      `UPDATE 180daraga_market SET cnt =${data[0].cnt} where id=${req.body.product_id}`
    );
    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//RETURN ALL PRODUCT
router.get("/sells", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const data = await query(`SELECT product_id, sells_quantity FROM thecamp_market_sells`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
module.exports = router;
