var http = require("http");

var fs = require("fs");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    res.setHeader("Content-Type", "text/plain");
    fs.createReadStream("./readme.txt").pipe(res);
}

server.listen(4567, () => {
    console.log("Server listening on port 4567");
});