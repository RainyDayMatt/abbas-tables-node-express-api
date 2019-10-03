const propertyQueries = require("../db/queries.properties.js");

module.exports = {
    create(req, res, next) {
        propertyQueries.createProperty(req.body, (err, property) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ property: property });
            }
        });
    },
    get(req, res, next) {
        propertyQueries.getProperty(req.params.key, (err, property) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ property: property });
            }
        });
    },
    update(req, res, next) {
        propertyQueries.updateProperty(req.params.key, req.body.updatedProperty, req.body.changingUser, (err, property) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ property: property });
            }
        });
    }
};
