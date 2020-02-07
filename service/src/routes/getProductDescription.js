const { Router } = require("express");
const router = Router();
var request = require("request");

router.get("/productDescription?", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    var itemID = req.query.productID;
    request("https://api.mercadolibre.com/items/"+ itemID +"/description", function(
      error,
      response,
      body
    ) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        var description = body.plain_text;
        res.send(description);
      }
    });
  });

  module.exports = router;