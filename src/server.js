const app = require("./app");
const http = require("http");

const port = normalizePort(process.env.PORT);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

function normalizePort(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        return 3000;
    } else {
        return parsedValue;
    }
}

server.on("listening", () => {
    console.log(`Server is listening for requests on port ${server.address().port}.`);
});