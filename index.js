const express = require('express');
const categories = require("./app/category");
const places = require("./app/places");
const items = require("./app/items");
const mysqlDb = require('./mysqlDb');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use("/categories", categories);
app.use("/places", places);
app.use("/items", items);

const run = async () => {
  await mysqlDb.connect();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
}
run().catch(e => {
  console.log(e);
});


