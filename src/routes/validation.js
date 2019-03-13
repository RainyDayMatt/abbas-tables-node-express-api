module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("email", "Must be a valid address.").isEmail();
            req.checkBody("password", "Must be alphanumeric.").isAlphanumeric();
            req.checkBody("password", "Must be between six and 20 characters.").isLength({min: 6, max: 20});
            req.checkBody("passwordConfirmation", "Must match provided password.").equals(req.body.password);
            req.checkBody("firstName", "Must consist only of letters.").isAlpha();
            req.checkBody("firstName", "Must be between two and 20 characters.").isLength({min: 2, max: 20});
            req.checkBody("lastName", "Must consist only of letters.").isAlpha();
            req.checkBody("lastName", "Must be between two and 20 characters.").isLength({min: 2, max: 20});
            req.checkBody({"canEnterMealCount": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canChangeProps": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canCreateNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canEditNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canDeleteNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canCreateNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canEditNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canDeleteNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
            req.checkBody({"canChangeRoles": {
                optional: true,
                isBoolean: {
                    errorMessage: "Must be a boolean."
                }
            }});
        }

        const errors = req.validationErrors();

        if (errors) {
            return res.json(errors);
        } else {
            return next();
        }
    }
};
