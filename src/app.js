const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const initModels = require("./models/init.models");
const routerApi = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

initModels();

routerApi(app);

module.exports = app;