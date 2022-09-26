const mongoose = require("mongoose");
require("../models/connection");

const bookSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  price: Number,
  date: Date,
});

const Book = mongoose.model("bookings", bookSchema);

module.exports = Book;
