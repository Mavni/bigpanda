var http = require('http');
var config = require('./config.json');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();
var fs = require('fs');


getFile();

function getFile(err, rfile){
    if (err) {
        console.log(err);
        return;
    }

    var files = [fs.readdir(config.path, function (err) {
        if (err) {
            console.log(err);
        }
    })];

    rfile = files[Math.floor(Math.random() * files.length)];
        console.log(rfile);
    return rfile;
}

dispatcher.onGet("/", function (req, res, data) {

    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    fs.readFile(rfile, function (err,data) {
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


