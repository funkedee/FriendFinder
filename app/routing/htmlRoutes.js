// export routes
module.exports = function(app) {
    // home route
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/tables.html"));
    });

    // servey route
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"))
    })
};