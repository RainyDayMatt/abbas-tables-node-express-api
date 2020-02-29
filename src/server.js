const http = require("http");

const app = require("./app");

const port = require("./support/utilities/envVariables").normalizePort(process.env.PORT);
app.set("port", port);

const server = http.createServer(app);
server.listen(port);

server.on("listening", () => {
    console.log(`Server is listening for requests on port ${ server.address().port }.`);
});
