var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../service/auth');

// create new user if one doesn't exist
// attempt to find the user by their username, then add the rest of the values from the request
router.post("/register", function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username,
        Email: req.body.email
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password) // encrypt the user password
      }
    })
    .spread(function(result, created) {
      if (created) { res.json("User successfully created"); }
      else { res.json("This user already exists"); }
    });
});

// login user and return JWT as cookie
// attempt to find the user by their username, if not found then respond "User not found"
//
router.post("/login", function(req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json("Login Failed");
      } else {
        // check to see if the passwords match
        let passwordMatch = authService.comparePasswords(req.body.password,user.Password);
        if (passwordMatch) {
          // passwords match, create a jwt token as a cookie and attach to the response
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.json("Login successful");
        } else {
          // wrong password, negative response
          console.log("Wrong password");
          res.json("Wrong password");
        }
      }
    });
});

// find a profile from a user (their user object) based on the received jtw cookie
router.get("/profile", function(req, res, next) {
  // read the cookie from the request
  let token = req.cookies.jwt;
  // if we have a cookie we can proceed
  if (token) {
    // validate the cookie
    authService.verifyUser(token).then(user => {
      if (user) {
        // empty the password field, do not send this property to the front-end
        user.Password = "";
        // return the user object
        res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.json("Invalid authentication token");
      }
    });
  } else {
    // no jwt cookie, assume user is not logged in
    res.status(401);
    res.json("Must be logged in");
  }
});

// logout
router.get("/logout", function(req, res, next) {
  // set a new jwt cookie that will immediately expire
  res.cookie("jwt", "", { expires: new Date(0) });
  res.json("Logged out");
});

module.exports = router;