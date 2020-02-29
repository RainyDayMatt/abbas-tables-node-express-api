const errorMessages = require("../support/dictionaries/errorMessages");

module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("email", errorMessages.getUserCreationErrorMessages().emailIsInvalid).isEmail();
            req.checkBody("password", errorMessages.getUserCreationErrorMessages().passwordLengthIsInvalid).isLength({min: 6, max: 20});
            req.checkBody("password", errorMessages.getUserCreationErrorMessages().passwordIsNotAlphanumeric).isAlphanumeric();
            req.checkBody("firstName", errorMessages.getUserCreationErrorMessages().firstNameLengthIsInvalid).isLength({min: 2, max: 20});
            req.checkBody("firstName", errorMessages.getUserCreationErrorMessages().firstNameIsNotAlphabetic).isAlpha();
            req.checkBody("lastName", errorMessages.getUserCreationErrorMessages().lastNameLengthIsInvalid).isLength({min: 2, max: 20});
            req.checkBody("lastName", errorMessages.getUserCreationErrorMessages().lastNameIsNotAlphabetic).isAlpha();
            req.checkBody({"canEnterMealCount": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canEnterMealCountIsNotBoolean
                }
            }});
            req.checkBody({"canChangeProps": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canChangePropsIsNotBoolean
                }
            }});
            req.checkBody({"canCreateNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canCreateNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canEditNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canEditNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canDeleteNewsItems": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canDeleteNewsItemsIsNotBoolean
                }
            }});
            req.checkBody({"canCreateNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canCreateNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canEditNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canEditNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canDeleteNewsItemComments": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canDeleteNewsItemCommentsIsNotBoolean
                }
            }});
            req.checkBody({"canChangeRoles": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canChangeRolesIsNotBoolean
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
    },
    validateProperties(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("whichUserCreated", errorMessages.getPropertyCreationErrorMessages().whichUserCreatedEmailIsInvalid).isEmail();
            req.checkBody("whichUserLastChanged", errorMessages.getPropertyCreationErrorMessages().whichUserLastChangedEmailIsInvalid).isEmail();
        } else if (req.method === "PATCH") {
            req.checkBody("whichUserLastChanged", errorMessages.getPropertyCreationErrorMessages().whichUserLastChangedEmailIsInvalid).isEmail();
            req.checkBody({"updatedProperty.whichUserCreated": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getPropertyCreationErrorMessages().whichUserCreatedEmailIsInvalid
                }
            }});
            req.checkBody({"updatedProperty.whichUserLastChanged": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getPropertyCreationErrorMessages().whichUserLastChangedEmailIsInvalid
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
    },
    validateServingSummaries(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("year", errorMessages.getServingSummaryCreationErrorMessages().yearIsNotNumeric).isNumeric();
            req.checkBody("month", errorMessages.getServingSummaryCreationErrorMessages().monthIsNotNumeric).isNumeric();
            req.checkBody("day", errorMessages.getServingSummaryCreationErrorMessages().dayIsNotNumeric).isNumeric();
            req.checkBody("totalMeals", errorMessages.getServingSummaryCreationErrorMessages().totalMealsIsNotNumeric).isNumeric();
            req.checkBody("adultGuestMeals", errorMessages.getServingSummaryCreationErrorMessages().adultGuestMealsIsNotNumeric).isNumeric();
            req.checkBody("childGuestMeals", errorMessages.getServingSummaryCreationErrorMessages().childGuestMealsIsNotNumeric).isNumeric();
            req.checkBody("volunteerMeals", errorMessages.getServingSummaryCreationErrorMessages().volunteerMealsIsNotNumeric).isNumeric();
            req.checkBody("whichUserCreated", errorMessages.getServingSummaryCreationErrorMessages().whichUserCreatedEmailIsInvalid).isEmail();
            req.checkBody("whichUserLastChanged", errorMessages.getServingSummaryCreationErrorMessages().whichUserLastChangedEmailIsInvalid).isEmail();
        } else if (req.method === "PATCH") {
            req.checkBody({"updatedServingSummary.year": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().yearIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.month": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().monthIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.day": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().dayIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.totalMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().totalMealsIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.adultGuestMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().adultGuestMealsIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.childGuestMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().childGuestMealsIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.volunteerMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().volunteerMealsIsNotNumeric
                }
            }});
            req.checkBody({"updatedServingSummary.whichUserCreated": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().whichUserCreatedEmailIsInvalid
                }
            }});
            req.checkBody({"updatedServingSummary.whichUserLastChanged": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().whichUserLastChangedEmailIsInvalid
                }
            }});
            req.checkBody({"whichUserLastChanged": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().whichUserLastChangedEmailIsInvalid
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
