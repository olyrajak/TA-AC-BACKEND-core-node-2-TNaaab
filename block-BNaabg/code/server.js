let http = require("http");
let fs = require("fs");
let path = require("path");
let qs = require("querystring");
let urlpath = require("url");

let userPath = path.join(__dirname, "users/");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let parsedUrl = urlpath.parse(req.url, true);
    let url = parsedUrl.pathname;
    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (url === "/users" && req.method === "GET") {
            let username = parsedUrl.query.username;
            fs.readFile(userPath + username + ".json", (err, content) => {
                if (err) return console.log(err);
                res.setHeader("Content-Type", "application/json");
                return res.end(content);
            });
        } else if (url === "/users" && req.method === "POST") {
            let username = parsedUrl.query.username;
            fs.open(userPath + username + ".json", "wx", (err, fd) => {
                if (err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err);
                    fs.close(fd, () => {
                        return res.end(`${username} Save Successfully`);
                    });
                });
            });
        } else if (url === "/users" && req.method === "PUT") {
            let username = parsedUrl.query.username;
            fs.open(userPath + username + ".json", "r+", (err, fd) => {
                if (err) return console.log(err);
                fs.ftruncate(fd, (err) => {
                    if (err) return console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if (err) return console.log(err);
                        fs.close(fd, () => {
                            return res.end(`${username} Update Successfully`);
                        });
                    });
                });
            });
        } else if (url === "/users" && req.method === "DELETE") {
            let username = parsedUrl.query.username;
            fs.unlink(userPath + username + ".json", (err) => {
                if (err) return console.log(err);
                return res.end(`${username} Successfully Delete`);
            });
        } else {
            res.statusCode = 404;
            res.end("Page not found");
        }
    });
}

server.listen(3000, function() {
    console.log("Server started at http://localhost:3000");
});