const userQueries = require("../db/queries.users.js");

module.exports = {
    checkUserEmailAvailability(req, res, next) {
        userQueries.checkUserEmailAvailability(req.body.email, (message) => {
            if (message) {
                return res.status(400).json({ err: [message] });
            }
            else {
                return next();
            }
        });
    }
};
