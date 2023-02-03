const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database")
const initModels = require("./models/init.models");
const routerApi = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

initModels();
db.authenticate()
  .then(() => console.log("DB autenticada"))
  .catch(error => console.log(error));

db.sync({ force: true })
  .then(() => console.log("DB sincronizada"))
  .catch(error => console.log(error));

routerApi(app);

module.exports = app;