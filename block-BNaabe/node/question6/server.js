// Q. Follow above question with form data containing fields i.e name and email.

// Parse form-data using querystring module
// respond with HTML page containing only email from data in H2 tag.

let http = require("http");
let qs = require("querystring");

let server = http.createServer((req, res) => {
    let header = req.headers["content-type"];
    if (header === "application/x-www-form-urlencoded") {
        if (req.url === "/" && req.method === "POST") {
            let store = "";
            req.on("data", (chunk) => {
                store += chunk;
            });
            req.on("end", () => {
                res.writeHeader(200, { "Content-Type": "text/html" });
                var parsedData = qs.parse(store);
                res.end(`<h2>${JSON.stringify(parsedData.email)}</h2>`);
            });
        }
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});