var express = require("express");
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET blog posts */
router.get("/blogs", function(req, res, next) {
  models.blogs
    .findAll({include: [{ table: tables.title}]})
    .then(blogsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(blogsFound));
    });  
});

module.exports = router;
