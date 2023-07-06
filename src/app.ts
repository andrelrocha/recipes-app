import express from "express";
import path from 'path';
import cons from 'consolidate';
import bodyParser from 'body-parser';
import * as dust from 'dustjs-helpers';

import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

export { app };