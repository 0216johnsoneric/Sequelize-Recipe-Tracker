// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");
const { get } = require("http");

// Routes

module.exports = function(app) {
// index route loads view/index.handlebars
  app.get("/", function(req, res) {

    if (req.user) {
      res.render("index");
    }
    else 
    res.render("signup");
    
  });

   app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/all", function(req, res) {
    res.render("all");
  });

  app.get("/add", function(req, res) {
    res.render("add");
  });

  app.get("/", isAuthenticated, function(req, res) {
    res.render("index");
  });


};
