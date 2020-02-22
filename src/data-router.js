const { Router } = require("express");
const request = require("superagent");
const router = new Router();

router.post("/data", (req, res) => {
  console.log("got a request on /data");
  console.log("this is the request body", req.body);
  const selection = req.body.selection;
  const url = `https://opendata.cbs.nl/ODataApi/odata/37852eng/TypedDataSet?$select=${selection}`;
  console.log("the Url for CBS request", url);
  request
    .get(url)
    .then(cbsResponse => {
      console.log("CBS response received");
      return cbsResponse;
    })
    .then(cbsResponse => {
      res.send(cbsResponse.body.value.slice(75));
    })
    .catch(err => {
      console.error(err);
      res.send({ status: "error in fetch" });
    });
});
