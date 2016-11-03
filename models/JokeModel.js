var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jokeModel = new Schema({

    'setup' : String,
    'punchline' : String
});

module.exports = mongoose.model('JokeModel', jokeModel);