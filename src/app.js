const express = require("express");
const path = require('path');
const cons = require('consolidate');
const bodyParser = require('body-parser');
const dust = require('dustjs-helpers');

const { routes } = require("./routes.js");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

module.exports = {
    app: app
  };