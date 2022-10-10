var http = require('http');
var server = http.createServer(handlerRequest);
var url = require('url');
var qs = require('querystring');
var server = http.createServer(handlerRequest);

function handlerRequest(req, res) {
    var parseurl = url.parse(req.url);
    var pathurl = parseurl.pathname;
    let method = req.method;
    // let url = req.url;
    let header = req.headers["content-type"];
    if (req.method === 'POST' && pathurl === '/json') {
        if (header === "application/json") {
            var store = '';
            req.on('data', (chunk) => {
                store = store + chunk;
            });
            req.on('end', () => {
                let data = JSON.parse(store);
                res.end(JSON.stringify(data));

            });
        }
    } else if (req.method === 'POST' && pathurl === '/form') {
        if (header === "application/x-www-form-urlencoded") {
            var store = '';
            req.on('data', (chunk) => {
                store = store + chunk;
            });
            req.on('end', () => {
                let data = qs.parse(store);
                res.end(JSON.stringify(data));

            });
        }
    }


}
server.listen(7000, () => {
    console.log("Server is listen on port 7000");
});