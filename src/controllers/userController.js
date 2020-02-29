const userQueries = require("../db/queries.users");
const userFields = require("../support/modelDefinitions/userSource").getFields();

module.exports = {
    create(req, res, next) {
        userQueries.createUser(req.body, (err, user) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ user: user });
            }
        });
    },
    signIn(req, res, next) {
        const signInUser = {
            email: req.body.email,
            password: req.body.password
        };
        userQueries.getUserLazy(signInUser, (err, user) => {
            if (err) {
                res.status(400).json({ err: err });
            } else {
                res.status(200).json({ user: user });
            }
        });
    }
};
