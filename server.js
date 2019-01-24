// require packages and setup express
var path = require("path");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

// setup middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// start server listening

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
