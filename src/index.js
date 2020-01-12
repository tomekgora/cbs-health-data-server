console.log("START OF INDEX.JS CODE");
const request = require("superagent");
const express = require("express");
const { Router } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = new Router();
const port = 4000;

const app = express();

// Middleware
corsMiddleware = cors();
parseMiddleware = bodyParser.json();
app.use(corsMiddleware);
app.use(parseMiddleware);
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));

//Forwarding request from App to CSB API and returning result

router.post("POST/data", (req, res) => {
  console.log("got a request on /data");
  console.log("this is the request body", req.body);
  const selection = req.body.selection;
  const url =
    "https://opendata.cbs.nl/ODataApi/odata/37852/TypedDataSet?$select=" +
    selection;
  console.log("the Url for CBS request", url);
  request
    .get(url)
    .then(cbsApiResponse => {
      console.log("This is the CBS response", cbsApiResponse);
      return cbsApiResponse;
    })
    .catch(err => {
      console.error(err);
      res.send({ status: "error in fetch" });
    })
    .res.send(cbsApiResponse)
    .catch(err => {
      console.error(err);
      res.send({ status: "server error in response" });
      re;
    });
});

console.log("END OF INDEX.JS CODE");
