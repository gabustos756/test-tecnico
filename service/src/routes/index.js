const { Router } = require("express");
const router = Router();
var request = require("request");

router.get("/results?", (req, res) => {
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

  var search = req.query.search;

  request("https://api.mercadolibre.com/sites/MLA/search?q=" + search, function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {

      body = JSON.parse(body);
      var categories = [];
      body.filters.forEach(element => {
        element.values.forEach(item =>{
          categories = item.path_from_root
        })
      });
      var products = [];
      results = body.results;
      for (let index = 0; index < results.length; index++) {
        if (index === 4) break;
        var item = {
          id: results[index].id,
          title: results[index].title,
          price: {
            currency: results[index].currency_id,
            amount: results[index].price,
            decimals: ""
          },
          picture: results[index].thumbnail,
          condition: results[index].condition,
          free_shipping: results[index].shipping.free_shipping,
          address: results[index].address.state_name
        };
        products.push(item);
      }
      
      res.status(200).send({ "categories" : categories,"products" : products });
    }
  });
});

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
