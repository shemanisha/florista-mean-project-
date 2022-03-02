const con = require("../db");
const express = require("express");
const router = express.Router();
const checkauth = require("../middleware/check-auth");

router.post("/addToCart", (req, res) => {
  const id = req.body.Flower[0].flowerid;
  console.log(req.body);
  const query = `Insert into cartItem (Quantity,flowerid) values (1,${id})`;

  const promise = new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).then((result) => {
    res.status(200).json({
      message: "Item added to the cart successfully!",
      flowers: result,
    });
  });
});

router.get("/getCartItems", (req, res) => {
  const query = `Select f.name,f.image,f.price,c.quantity from flower1 f Inner Join cartItem c on f.flowerid=c.flowerid`;

  const promise = new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).then((result) => {
    res.status(200).json({
      flowers: result,
    });
  });
});

module.exports = router;
