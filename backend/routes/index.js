var express = require("express");
var router = express.Router();
require("../models/connection");

// TESTING
router.get("/", (req, res) => {
	const salutation = "Bienvenue a la gare";
	console.log("let's go");
	res.json({ Salutation: salutation });
});

module.exports = router;
