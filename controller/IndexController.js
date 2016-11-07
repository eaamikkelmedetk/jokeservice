var request = require("request");
var async = require("async");

var serviceUrls = [];
var allJokes = [];

module.exports.show = function (req, res) {

    collectServices().then(function (obj) {
        var adresses = obj.map(function (property) {
            return property.address;
        });
        Promise.all(extractJokes(adresses[0])).then(function (jokes) {
            console.log(jokes);
        }).catch(function(e) {
            console.log(e);
        } );
    });

    /*Promise.all([extractJokes('https://joke-service.herokuapp.com/api/'), extractJokes('https://frederik-jokes.herokuapp.com/api/')]).then(function (result) {
        console.log(result);
    }).catch(function (e) {
        console.log(e);
    })
*/
};

var collectServices = function () {
    return new Promise(function (resolve, reject) {
        request("https://krdo-joke-registry.herokuapp.com/api/services", function (error, response, body) {
            if (error) {
                reject('BadRequest');
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};

/*var extractAddressesFromService = function (services) {
    return new Promise(function (resolve, reject) {
        var adresses = services.map(function (property) {
            return property.address;
        });
        resolve(adresses);
    });
}*/

/*var extractJokes = function (req, res, addresses) {
    var jokes = [];
    new Promise(function (resolve, reject) {
        for (var i = 0; i < addresses.length; i++) {
            request(addresses[i] + 'jokes', function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    jokes.push(JSON.parse(body));
                    resolve(jokes);
                }
            });
        }
    }).then(function (jokes) {
        res.render("index", { "jokes": jokes[0] });
        console.log(jokes[0]);
    });
}*/

var extractJokes = function (address) {
    return new Promise(function (resolve, reject) {
        request(address + 'jokes', function (err, response, body) {
            if (!err && response.statusCode === 200) {
                resolve(JSON.parse(body));
            } else {
                reject("Bad Request");
            }
        })
    })
}

