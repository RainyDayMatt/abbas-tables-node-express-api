require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

module.exports = {
    init(app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(expressValidator());
    }
};
