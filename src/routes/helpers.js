const userQueries = require("../db/queries.users.js");
const propertyQueries = require("../db/queries.properties");
const servingSummaryQueries = require("../db/queries.servingSummaries");

module.exports = {
    checkUserEmailAvailability(req, res, next) {
        userQueries.checkUserEmailAvailability(req.body.email, (message) => {
            if (message) {
                return res.status(400).json({ err: [ message ] });
            } else {
                return next();
            }
        });
    },
    checkPropertyKeyAvailability(req, res, next) {
        propertyQueries.checkPropertyKeyAvailability(req.body.key, (message) => {
            if (message) {
                return res.status(400).json({ err: [ message ] });
            } else {
                return next();
            }
        });
    },
    checkServingSummaryDateAvailability(req, res, next) {
        servingSummaryQueries.checkServingSummaryDateAvailability(req.body.year, req.body.month, req.body.day, (message) => {
            if (message) {
                return res.status(400).json({ err: [ message ] });
            } else {
                return next();
            }
        });
    }
};
