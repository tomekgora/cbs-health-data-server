const request = require("superagent");
const express = require("express");
const { Router } = require("express");
const cors 
const bodyParser = require("body-parser");

const router = new Router();
const port = 4000;

const app = express();

parseMiddleware = bodyParser.json();
app.use(parseMiddleware);
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`))
