// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

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
                res.writeHeader(200, { "Content-Type": "text/html" });
                var parsedData = JSON.parse(store);
                res.end(
                    `<h1>Name: ${parsedData.name}</h1><h1>Email: ${parsedData.email}</h1>`
                );
            });
        }
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});