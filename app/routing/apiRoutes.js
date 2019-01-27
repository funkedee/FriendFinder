var path = require("path");
var friendData = require("../data/friends");

// export routes
module.exports = function(app) {
    // get api route
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    // post api route
    app.post("/api/friends", function(req, res) {
        friendData.push(req.body);
    })
};