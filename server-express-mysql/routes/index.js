var express = require("express");
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');

/* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

/* GET List Page */
// router.get('/list', function(req, res, next) {
//   res.render('list', {
//     cats: [
//       { title: 'First' },
//     ]
//   });
// });

router.get("/blogs",(req,res,next)=>{
  models.blogs.findAll({}).then (result => {
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(result));
  });
});

/* POST blog posts */
router.post('/blogs', function (req, res, next) {
  models.blogs.create(req.body)
    .then(newBlogs => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newBlogs));
    })
    .catch(err => {
      res.status(400);
      res.send(err.message);
    });
});


/* PUT blog posts */
router.put("/blogs/:id", function (req, res, next) {
  let blogId = parseInt(req.params.id);
  models.blogs
    .update(req.body, { where: { id: blogId } })
    .then(result => res.redirect('/blogs/' + blogId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the actor.  Please check the actor information.");
    });
});


/* DELETE blog posts */
router.delete('/blogs/:id', function(req, res, next) {
  let blogId = parseInt(req.params.id);
  models.blogs
    .destroy({ where: { id: blogId }})
    .then(result => res.redirect('/blogs'))
    .catch(err => {
      res.status(400);
      res.send("There was a problem deleting the blog.  Please make sure you are specifying the correct id.")
    })
});

module.exports = router;
