var request = require("request");

module.exports.show = function(req, res) {
    request("http://" + req.headers.host + '/api/jokes', function(error, response, body) {
        if(error) {
            console.log(error);
        } else {
            res.render("index", {"jokes": JSON.parse(body)});
        }
    });
    
};