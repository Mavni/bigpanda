var http = require('http');
var config = require('./config.json');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();
var fs = require('fs');

var files = fs.readdirSync(config.path);

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    }
    catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/", function (req, res, data) {

    var rfile = files[Math.floor(Math.random() * files.length)];
    rfile = config.path + rfile;
    fs.readFile(rfile, function (err, data) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    })
});


dispatcher.onError(function (req, res) {
    res.writeHead(404);
    res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function () {
    console.log("Server listening on: http://localhost:%s", config.port)
});