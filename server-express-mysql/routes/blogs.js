var express = require("express");
var router = express.Router();
var models = require("../models"); //<--- Add models

/* GET users listing. */
router.get("", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/list", function (req, res, next) {
  res.render("list");
});

module.exports = router;