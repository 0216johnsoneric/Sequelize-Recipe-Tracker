var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var PORT = process.env.PORT || 3030;
var app = express();

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// SETUP HANDLEBARS
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// app.use(routes);

//luis code
db.sequelize.sync().then(function(){

  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });

});