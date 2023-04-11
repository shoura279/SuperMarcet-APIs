const express = require("express");
const app = express();

app.use(express.json());

const product = require("./routes/products");
const sells = require("./routes/sells");

app.use("/market", product);
app.use("/market", sells);

app.listen(4000, () => {
  console.log("server is running");
});
