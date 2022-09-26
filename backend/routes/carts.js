var express = require("express");
var router = express.Router();
const Cart = require("../models/carts");
require("../models/connection");

router.get("/", (req, res) => {
  Cart.find({}).then((data) => res.json({ data }));
});

router.post("/cart", (req, res) => {
  const newCart = new Cart({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: req.query.date,
    price: req.query.price,
  });
  newCart.save();
  Cart.find({}).then((data) => {
    res.json({
      data,
    });
  });
});

router.delete("/deletecart", (req, res) => {
  Cart.deleteOne({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: req.query.date,
    price: req.query.price,
  }).then(() => Cart.find({}).then((data) => res.json({ data })));
});

module.exports = router;

router.delete("/deleteAll", (req, res) => {
  Cart.deleteMany({}).then((data) => res.json(data));
});
