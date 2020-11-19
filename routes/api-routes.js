// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *******************************************************************************

var db = require("../models");
var passport = require("../config/passport");

// Routes

module.exports = function(app) {


  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

    // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("login");
  });


  // GET route for getting all of the posts and return them to the user with res.json
    app.get("/api/all", function(req, res) {
      db.Recipe.findAll({}).then(function(result) {
        res.json(result);
        });
    });
    
    // Get route for retrieving a single recipe where by name
    app.get("/api/recipes/:name", function(req, res) {
      db.Recipe.findAll ({
        where: {
            name: req.params.name
        } 
      }).then(function (result){
          res.json(result);
      });
    });

        // Get route for retrieving a single recipe where by name
        app.get("/api/recipes/ingredients/:ingredients", function(req, res) {
          db.Recipe.findAll ({
            where: {
                ingredients: req.params.ingredients
            } 
          }).then(function (result){
              res.json(result);
          });
        });
    

    // Get route for retrieving a single recipe where by category
    app.get("/api/recipes/category/:category", function(req, res) {
      db.Recipe.findAll ({
        where: {
            category: req.params.category
        } 
      }).then(function (result){
          res.json(result);
      });
    });


    // POST route for saving a new recipe for creating a recipe using req.content
    app.post("/api/new", function(req, res) {
      console.log(req.body)
      db.Recipe.create(req.body).then(function (result){
        res.json(result);
      })
    });


    app.put("/recipes", function(req, res) {
      
      db.Recipe.update({
          name: req.body.name,
          ingredients: req.body.ingredients,
          category: req.body.category,
          content: req.body.content 
      
      }, {
        where: {
          id: req.body.id
        }
      }).then(function(result) {
        res.json(result);
      });
    });

    // DELETE route for deleting recipes where the id is equal to req.params.id,
    app.delete("/api/all/:id", function(req, res) {
      db.Recipe.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(result) {
        res.json(result);
      });
    });



};
