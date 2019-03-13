const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

module.exports = {
    init(app) {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(expressValidator());
    }
};
