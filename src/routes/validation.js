module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("email", "Email must be a valid address.").isEmail();
            req.checkBody("password", "Password must be between six and 20 characters.").isLength({min: 6, max: 20});
            req.checkBody("password", "Password must be alphanumeric.").isAlphanumeric();
            req.checkBody("confirmationPassword", "Confirmation must match provided password.").equals(req.body.password);
            req.checkBody("firstName", "First name must be between two and 20 characters.").isLength({min: 2, max: 20});
            req.checkBody("firstName", "First name must consist only of letters.").isAlpha();
            req.checkBody("lastName", "Last name must be between two and 20 characters.").isLength({min: 2, max: 20});
            req.checkBody("lastName", "Last name must consist only of letters.").isAlpha();
            req.checkBody({"canEnterMealCount": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canEnterMealCount) must be a boolean."
                }
            }});
            req.checkBody({"canChangeProps": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canChangeProps) must be a boolean."
                }
            }});
            req.checkBody({"canCreateNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canCreateNewsItems) must be a boolean."
                }
            }});
            req.checkBody({"canEditNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canEditNewsItems) must be a boolean."
                }
            }});
            req.checkBody({"canDeleteNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canDeleteNewsItems) must be a boolean."
                }
            }});
            req.checkBody({"canCreateNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canCreateNewsItemComments) must be a boolean."
                }
            }});
            req.checkBody({"canEditNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canEditNewsItemComments) must be a boolean."
                }
            }});
            req.checkBody({"canDeleteNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canDeleteNewsItemComments) must be a boolean."
                }
            }});
            req.checkBody({"canChangeRoles": {
                optional: true,
                isBoolean: {
                    errorMessage: "Role (canChangeRoles) must be a boolean."
                }
            }});
        }

        if (req.validationErrors()) {
            const errors = [];
            req.validationErrors().forEach((error) => {
                errors.push(error.msg);
            });
            return res.status(400).json(errors);
        } else {
            return next();
        }
    }
};
