var express = require("express");
var router = express.Router();
require("../models/connection");
const Trip = require("../models/trips");
const moment = require("moment");

// router.get("/departure/:cityName", (req, res) => {
//   Trip.find({ departure: req.params.cityName }).then((data) =>
//     res.json({ data })
//   );
// });

// router.get("/arrival/:cityName", (req, res) => {
//   Trip.find({ arrival: req.params.cityName }).then((data) =>
//     res.json({ data })
//   );
// });

// router.get("/date/:startingDate", (req, res) => {
//   const startDate = moment(req.params.startingDate).add(2, "h").format();
//   const endDate = moment(startDate).add(1, "d").format();
//   Trip.find({ date: { $gte: startDate, $lte: endDate } }).then((data) =>
//     res.json({ data })
//   );
// });

router.get("/", (req, res) => {
  const { departure, arrival, date } = req.query;
  const startDate = moment(req.query.date).format();
  const endDate = moment(startDate).add(1, "d").format();

  Trip.find({
    departure: departure,
    arrival: arrival,
    date: { $gte: startDate, $lte: endDate },
  }).then((data) => res.json({ data }));
});

module.exports = router;
