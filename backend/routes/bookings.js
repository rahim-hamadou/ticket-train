var express = require("express");
var router = express.Router();
require("../models/connection");
const Book = require("../models/bookings");

router.get("/", (req, res) => {
  Book.find({}).then((data) => res.json({ data }));
});

router.post("/book", (req, res) => {
  const newBook = new Book({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: req.query.date,
    price: req.query.price,
  });
  newBook.save();
  Book.find({}).then((data) => {
    res.json({
      data,
    });
  });
});

router.delete("/deleteAll", (req, res) => {
  Book.deleteMany({}).then((data) => res.json(data));
});

module.exports = router;
