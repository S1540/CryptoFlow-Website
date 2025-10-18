const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const PORT = 4000;

const server = http.createServer((req, res) => {
  // --------- index.html -----------
  if (req.method === "GET" && req.url === "/") {
    const filepath = path.join(__dirname, "index.html");
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });

    // --------- form.html -----------
  } else if (
    (req.method === "GET" && req.url === "/form") ||
    req.url === "/form.html"
  ) {
    const filepath = path.join(__dirname, "form.html");
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });

    // --------- Tailwind CSS -----------
  } else if (req.method === "GET" && req.url === "/src/output.css") {
    const cssPath = path.join(__dirname, "src/output.css");
    fs.readFile(cssPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("CSS File Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const formData = qs.parse(body);
      const saveData = `Name: ${formData.fullname}\nEmail: ${formData.email}\n Phone: ${formData.phone} \n Experience: ${formData.experience} \n Investment: ${formData.investment}\n`;
      fs.appendFile(path.join(__dirname, "data.txt"), saveData, (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error saving data");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Data saved successfully");
        }
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () =>
  console.log(`Server Running at http://localhost:${PORT}`)
);
