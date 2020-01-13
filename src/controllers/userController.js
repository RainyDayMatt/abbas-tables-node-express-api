const userQueries = require("../db/queries.users.js");

module.exports = {
    create(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            confirmationPassword: req.body.confirmationPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobilePhone: req.body.mobilePhone,
            canEnterMealCount: req.body.canEnterMealCount,
            canChangeProps: req.body.canChangeProps,
            canCreateNewsItems: req.body.canCreateNewsItems,
            canEditNewsItems: req.body.canEditNewsItems,
            canDeleteNewsItems: req.body.canDeleteNewsItems,
            canCreateNewsItemComments: req.body.canCreateNewsItemComments,
            canEditNewsItemComments: req.body.canEditNewsItemComments,
            canDeleteNewsItemComments: req.body.canDeleteNewsItemComments,
            canChangeRoles: req.body.canChangeRoles
        };
        console.log(newUser);
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                res.status(400).json({ err: err });
            }
            else {
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
            }
            else {
                res.status(200).json({ user: user });
            }
        });
    }
};
