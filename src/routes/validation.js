const validationMessages = require("../support/dictionary").getValidationMessages();

module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("email", validationMessages.emailIsInvalid).isEmail();
            req.checkBody("password", validationMessages.passwordLengthIsInvalid).isLength({min: 6, max: 20});
            req.checkBody("password", validationMessages.passwordIsNotAlphanumeric).isAlphanumeric();
            req.checkBody("confirmationPassword", validationMessages.confirmationPasswordDoesNotMatch).equals(req.body.password);
            req.checkBody("firstName", validationMessages.firstNameLengthIsInvalid).isLength({min: 2, max: 20});
            req.checkBody("firstName", validationMessages.firstNameIsNotAlphabetic).isAlpha();
            req.checkBody("lastName", validationMessages.lastNameLengthIsInvalid).isLength({min: 2, max: 20});
            req.checkBody("lastName", validationMessages.lastNameIsNotAlphabetic).isAlpha();
            req.checkBody({"canEnterMealCount": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canEnterMealCountIsNotBoolean
                }
            }});
            req.checkBody({"canChangeProps": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canChangePropsIsNotBoolean
                }
            }});
            req.checkBody({"canCreateNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canCreateNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canEditNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canEditNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canDeleteNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canDeleteNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canCreateNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canCreateNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canEditNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canEditNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canDeleteNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canDeleteNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canChangeRoles": {
                optional: true,
                isBoolean: {
                    errorMessage: validationMessages.canChangeRolesIsNotBoolean
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
