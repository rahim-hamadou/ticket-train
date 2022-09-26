const mongoose = require("mongoose");
require("../models/connection");

const tripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
});

const Trip = mongoose.model("trips", tripSchema);

module.exports = Trip;
