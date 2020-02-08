const userValidationMessages = require("../support/dictionaries/errorMessages").getUserCreationErrorMessages();

module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("email", userValidationMessages.emailIsInvalid).isEmail();
            req.checkBody("password", userValidationMessages.passwordLengthIsInvalid).isLength({min: 6, max: 20});
            req.checkBody("password", userValidationMessages.passwordIsNotAlphanumeric).isAlphanumeric();
            req.checkBody("firstName", userValidationMessages.firstNameLengthIsInvalid).isLength({min: 2, max: 20});
            req.checkBody("firstName", userValidationMessages.firstNameIsNotAlphabetic).isAlpha();
            req.checkBody("lastName", userValidationMessages.lastNameLengthIsInvalid).isLength({min: 2, max: 20});
            req.checkBody("lastName", userValidationMessages.lastNameIsNotAlphabetic).isAlpha();
            req.checkBody({"canEnterMealCount": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canEnterMealCountIsNotBoolean
                }
            }});
            req.checkBody({"canChangeProps": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canChangePropsIsNotBoolean
                }
            }});
            req.checkBody({"canCreateNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canCreateNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canEditNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canEditNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canDeleteNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canDeleteNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canCreateNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canCreateNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canEditNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canEditNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canDeleteNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canDeleteNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canChangeRoles": {
                optional: true,
                isBoolean: {
                    errorMessage: userValidationMessages.canChangeRolesIsNotBoolean
                }
            }});
        }

        if (req.validationErrors()) {
            const errors = [];
            req.validationErrors().forEach((error) => {
                errors.push(error.msg);
            });
            return res.status(400).json({ err: errors });
        } else {
            return next();
        }
    }
};
