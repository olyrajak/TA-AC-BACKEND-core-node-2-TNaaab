var http = require('http');
var server = http.createServer(handlerRequest);
var url = require('url');

var server = http.createServer(handlerRequest);

function handlerRequest(req, res) {
    var parseurl = url.parse(req.url);
    var pathurl = parseurl.pathname;
    console.log(req.method, req.url, parseurl.pathname);
    if (req.method === 'POST' && pathurl === '/') {
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        });
        req.on('end', () => {
            console.log(store);

        });
    }


}
server.listen(3456, () => {
    console.log("Server is listen on port 3456");
});