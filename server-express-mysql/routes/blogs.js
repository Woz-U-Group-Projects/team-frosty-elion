var express = require("express");
var router = express.Router();
var models = require("../models"); //<--- Add models

/* GET users listing. */
router.get("", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/addBlog", function(req, res, next) {
  models.blogs.create(req.body)
    .then(newPost => {
      res.send(JSON.stringify(newPost));
    })
});

router.get("/list", function (req, res, next) {
  res.send(JSON.stringify(models.blogs));
});

module.exports = router;