var http = require('http');
var config = require('./config.json');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();
var fs = require('fs');

//read file names from the resource folder to an array
var files = fs.readdirSync(config.path);

//he who handles requests, his name shall be handleRequest
function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    }
    catch(err) {
        console.log(err);
    }
}
//once a GET request is sent to '/'
dispatcher.onGet("/", function (req, res, data) {
    //pick a random file from the file name array
    var rfile = files[Math.floor(Math.random() * files.length)];
    rfile = config.path + rfile;
    //#read the content of the file as is
    fs.readFile(rfile, function (err, data) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        //serve it to the user as a photo for his panda enjoyment on browsers, or ASCII hell with curl, fun!
        res.end(data);
    })
});

// if a user tries accessing a non existing address
dispatcher.onError(function (req, res) {
    res.writeHead(404);
    res.end("404 - This is a NO PANDA zone, you might want to stick to '/'");
});
//start the fun!
http.createServer(handleRequest).listen(config.port, function () {
    console.log("Server listening on: http://localhost:%s", config.port)
});