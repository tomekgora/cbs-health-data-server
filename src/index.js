const express = require("express");
const cors = require("cors");
const bodyParser = require("express");

const port = 4000;

const app = express();

// Middleware
const corsMiddleware = cors();
app.use(corsMiddleware);

const parseMiddleware = bodyParser.json();
app.use(parseMiddleware);

const dataRouter = require("./data-router.js");
app.use(dataRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
