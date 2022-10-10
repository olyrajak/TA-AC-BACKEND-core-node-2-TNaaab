// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.



let http = require("http");
let qs = require("querystring");

let server = http.createServer((req, res) => {
    let header = req.headers["content-type"];
    if (header === "application/json") {
        if (req.url === "/" && req.method === "POST") {
            let store = "";
            req.on("data", (chunk) => {
                store += chunk;
            });
            req.on("end", () => {
                res.statusCode = 201;
                var parsedData = qs.parse(store);
                res.end(JSON.stringify(parsedData));
            });
        }
    }
});

server.listen(3030, () => {
    console.log("Server is running on port 3030");
});