var http = require('http');
var config = require('./config.json');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();
var fs = require('fs');

// A counter with an attitude
var counter = 0;

// I handle requests, hence handleRequest
function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

// When accessing "/" with a GET request, the counter will be displayed
dispatcher.onGet("/", function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(counter.toString());
    res.write(' Panda POSTs have been served');
    res.end('\n');

});

// When sending POST requests to "/", counter will add 1, Every. POST. COUNTS.
dispatcher.onPost("/", function(req, res) {

    counter++;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Thanks for POSTing! Don't forget to check our counter on GET!\n");

});

// When accessing any other address then "/", a 404 will be displayed
dispatcher.onError(function(req, res) {
    res.writeHead(404);
    res.end("404 - This is a NO PANDA zone, you might want to stick to '/'\n");

});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});