//include libraries as needed
var http = require("http");
//var https = require("https");
var util = require("util");
const dns = require('dns'); //used to translate a domain to an ip address

exports.handler = (event, context, callback) => {
    console.log("Testing...");
    var message = ""; //the value output by the Lambda function
    message = message + "<html><body>";
    
    //CONNECT TO A WEB API
    
    //declare variables
    var apiKey = 'dde2d15e5c1ba869b15d345fbd976adc'; //API key for calling the weather API
    var locationForAPI = "Houston"; //string to pass to the API
    var URLtoCall = "http://api.openweathermap.org/data/2.5/weather?q=" + locationForAPI + "&APPID=" + apiKey;
    
    var body = "BODY: ";
    var jsonObject = JSON.stringify(event);
    var buffer = "";

    // the post options
    var reqPost = http.request(URLtoCall, function(res) {
        console.log("statusCode: ", res.statusCode);
        res.on('data', function (chunk) {
            body += chunk;
            //console.log(' ' + chunk); //the full JSON data
            var response = JSON.parse(' ' + chunk);
            console.log("Name = " + response.name);
            console.log("Temperature = " + response.main.temp);
            console.log("Humidity = " + response.main.humidity);
        })
        res.on('end', function() 
        { 
            message = body;
            callback(null, message);
        });
        
    });
    
    reqPost.write(buffer);
    reqPost.end();
};

