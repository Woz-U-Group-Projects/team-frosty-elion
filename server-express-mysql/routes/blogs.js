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

// Create new user if one doesn't exist
router.post("/add", function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        UserId: req.body.userId
      },
      defaults: {
        UserId: req.body.userId,
        Title: req.body.title,
        Post: req.body.post,
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send("Post successfully created");
      } else {
        res.send("This post already exists");
      }
    });
});

router.get("/list", function (req, res, next) {
  res.render("list");
});

router.get("/blogs/edit/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.Admin) {
        models.users
          .findOne({ where: { PostId: postId }, raw: true })
          .then(user => res.render("edit", { user: user }));
      } else {
        res.send("unauthorized");
      }
    });
  }
});

router.delete("/blogs/edit/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(post => {
      if (post.Blog) {
        models.blog
          .update({ Deleted: true }, { where: { PostId: postId }, raw: true })
          .then(user => res.redirect("/blogs/list"));
      } else {
        res.send("unauthorized");
      }
    });
  }
});

module.exports = router;