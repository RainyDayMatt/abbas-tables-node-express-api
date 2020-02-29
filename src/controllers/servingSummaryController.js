const servingSummaryQueries = require("../db/queries.servingSummaries");
const servingSummaryFields = require("../support/modelDefinitions/servingSummarySource").getFields();

module.exports = {
    create(req, res, next) {
        servingSummaryQueries.createServingSummary(req.body, req.body.whichUserCreated, (err, servingSummary) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ servingSummary: servingSummary });
            }
        });
    },
    get(req, res, next) {
        servingSummaryQueries.getServingSummary(req.params.year, req.params.month, req.params.day, (err, servingSummary) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ servingSummary: servingSummary });
            }
        });
    },
    update(req, res, next) {
        servingSummaryQueries.updateServingSummary(req.params.year, req.params.month, req.params.day, req.body.updatedServingSummary, req.body.whichUserLastChanged, (err, servingSummary) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ servingSummary: servingSummary });
            }
        });
    }
};
