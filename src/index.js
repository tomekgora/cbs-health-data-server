console.log("START OF INDEX.JS CODE");
const request = require("superagent");
const express = require("express");
const { Router } = require("express");
const cors = require("cors");
const bodyParser = require("express");

const router = new Router();
const port = 4000;

const app = express();

// Middleware
corsMiddleware = cors();
app.use(corsMiddleware);

parseMiddleware = bodyParser.json();
app.use(parseMiddleware);

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));

//Forwarding request from App to CSB API and returning result

//FILTERING: filter=((substringof(%27NL%27,RegioS)))

router.post("/data", (req, res) => {
  console.log("got a request on /data");
  console.log("this is the request body", req.body);
  const selection = req.body.selection;
  const url =
    "https://opendata.cbs.nl/ODataApi/odata/37852eng/UntypedDataSet?$select=" +
    selection;
  console.log("the Url for CBS request", url);
  request
    .get(url)
    .then(cbsResponse => {
      console.log("CBS response received");
      return cbsResponse;
    })
    .then(cbsResponse => {
      res.send(cbsResponse.body);
    })
    .catch(err => {
      console.error(err);
      res.send({ status: "error in fetch" });
    });
});

console.log("END OF INDEX.JS CODE");
