var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../service/auth');

// Register new user if one doesn't exist
router.post('/register', function(req, res, next) {
  models.users
    .findOrCreate({
      where: { 
        Username: req.body.username,
        Email: req.body.email
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password) 
      }
    })
    .then(user => {
      res.send(JSON.stringify(user));
    })
});

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.users
    .findOne({ where: { Username: req.body.username } })
    .then(user => {
      if (!user) {
        console.log('User not found')
        return res.status(401).json({
          message: "Login Failed"
        });
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.status(200).send({
            auth: true,
            accessToken: token,
            username: user.username
          });
        } else {
          console.log('Wrong password');
          res.send('Wrong password');
        }
      }
    });
});

// Profile
router.get('/profile', function (req, res, next) {
  let token = req.headers['x-access-token'];
  if(token) {
    authService
      .verifyUser(token)
      .then(user => {
        if(user) { res.send(JSON.stringify(user)); } 
        else { res.status(500).send({auth: false}); }
      });
  } else {
    res.status(403);
    res.send('Must be logged in');
  }
});

module.exports = router;