// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

let http = require("http");
let qs = require("querystring");

let server = http.createServer((req, res) => {
    let header = req.headers["content-type"];
    if (req.url === "/" && req.method === "POST") {
        let store = "";
        req.on("data", (chunk) => {
            store += chunk;
        });
        req.on("end", () => {
            res.statusCode = 201;
            if (header === "application/json") {
                var parsedData = JSON.parse(store);
                res.end(JSON.stringify(parsedData));
            } else if (header === "application/x-www-form-urlencoded") {
                var parsedData = qs.parse(store);
                res.end(JSON.stringify(parsedData));
            }
        });
    }
});

server.listen(9000, () => {
    console.log("Server is running on port 9000");
});