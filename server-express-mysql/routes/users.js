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
          user.token = token;
          res.json(user);
        } else {
          console.log('Wrong password');
          res.send('Wrong password');
        }
      }
    });
});

// Profile
router.get('/profile', function(req, res, next) {
  res.send(JSON.stringify(models.user));
});

// Logout
router.get('/logout', function(req, res, next) {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.json("Logged out");
});

// validate a token
router.get("/validateToken", function(req, res, next) {
  // check to see if there is a token
  let token = req.cookies.jwt;
  if (token) {
    // validate the user from the token (same as finding profile)
    authService.verifyUser(token).then(user => {
      if (user) {
        // token valid, return true
        res.json(true);
      } else {
        // token invalid, return false
        res.json(false);
      }
    });
  } else {
    // no token, return false
    res.json(false);
  }
});

module.exports = router;