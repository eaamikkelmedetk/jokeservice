var request = require("request");
var jokeModel = require("../models/JokeModel");

module.exports.index = function(req, res) {
    jokeModel.find().exec().then(function(jokes) {
        res.render("index", {"jokes": jokes});
    });
};