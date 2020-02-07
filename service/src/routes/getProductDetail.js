const { Router } = require("express");
const router = Router();
var request = require("request");

router.get("/productDetail?", (req, res) => {
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
    request("https://api.mercadolibre.com/items?id=" + itemID, function(
      error,
      response,
      body
    ) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        var item = {
          id: body.id,
          title: body.title,
          price: {
            currency: body.currency_id,
            amount: body.price,
            decimals: ""
          },
          picture: body.pictures[0].secure_url,
          condition: body.condition,
          free_shipping: body.shipping.free_shipping,
          address: body.seller_address.city.name,
          description: body.descriptions,
          sold_quantity: body.sold_quantity
        };
        res.send(item);
      }
    });
  });

  module.exports = router;