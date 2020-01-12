const request = require("superagent");
const express = require("express");
const { Router } = require("express");
const cors 
const bodyParser = require("body-parser");

const router = new Router();
const port = 4000;

const app = express();

// Middleware
parseMiddleware = bodyParser.json();
app.use(parseMiddleware);
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`))


//Forwarding request from App to CSB API and returning result

router
    .post("POST/data", (req, res) => {
        console.log("got a request on /data")
        console.log("this is the request body", req.body)
        const selection = req.body.selection;
        const url = 
            "https://opendata.cbs.nl/ODataApi/odata/70072ned/UntypedDataSet?$filter=((substringof(%27NL%27,RegioS)))&$select=" +
            selection;
        console.log("the Url for CBS request", url);
        request
            .get(url)
            .then(cbsApiResponse => {
                return cbsApiResponse
            })
            .catch(err => {
                console.error(err);
                res.send({ status: "error in fetch"});
            })
    .res.send(cbsApiResponse)
    .catch(err => {
        console.error(err)
        res.send({status: "server error in response"})
        re
    });
});