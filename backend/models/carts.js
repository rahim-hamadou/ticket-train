const mongoose = require("mongoose");
require("../models/connection");

const cartSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  price: Number,
  date: Date,
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;
