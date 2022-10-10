// Q.Suppose we have 3 files inside a directory on desktop
// The structure is
//     -
//     node(folder) -
//     app.js -
//     server.js -
//     index.html
// You are currently inside server.js

// Write code to
//     -
//     capture absolute path of `server.js` (itself) -
//     get absolute path of `app.js` -
//     get realtive path of `index.html` -
//     get absolute path of `index.html`
// using `path module`

const path = require("path");

let absolutePath = __filename;
console.log(absolutePath);

let absolutepathApp = path.join(__dirname, "app.js");
console.log(absolutepathApp);

let relativepathIndex = path.relative(__dirname, "index.html");
console.log(relativepathIndex);
let absolutepathIndex = path.join(__dirname, "index.html");
console.log(absolutepathIndex);