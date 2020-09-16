const errorMessages = require("../support/dictionaries/errorMessages");
const regularExpressions = require("../support/dictionaries/regularExpressions");

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
            req.checkBody({"canChangeStaffMembers": {
                optional: true,
                isBoolean: {
                    errorMessage: errorMessages.getUserCreationErrorMessages().canChangeStaffMembersIsNotBoolean
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
            req.checkBody({"whichUserCreated": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getPropertyCreationErrorMessages().whichUserCreatedEmailIsInvalid
                }
            }});
            req.checkBody({"whichUserLastChanged": {
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
            req.checkBody({"year": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().yearIsNotNumeric
                }
            }});
            req.checkBody({"month": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().monthIsNotNumeric
                }
            }});
            req.checkBody({"day": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().dayIsNotNumeric
                }
            }});
            req.checkBody({"totalMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().totalMealsIsNotNumeric
                }
            }});
            req.checkBody({"adultGuestMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().adultGuestMealsIsNotNumeric
                }
            }});
            req.checkBody({"childGuestMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().childGuestMealsIsNotNumeric
                }
            }});
            req.checkBody({"volunteerMeals": {
                optional: true,
                isNumeric: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().volunteerMealsIsNotNumeric
                }
            }});
            req.checkBody({"whichUserCreated": {
                optional: true,
                isEmail: {
                    errorMessage: errorMessages.getServingSummaryCreationErrorMessages().whichUserCreatedEmailIsInvalid
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
    },
    validateStaffMembers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("groupName", errorMessages.getStaffMemberCreationErrorMessages().groupNameIsNotAlphabeticalWithSpaces).matches(regularExpressions.getStaffMemberFieldPatterns().groupName);
            req.checkBody("orderNumber", errorMessages.getStaffMemberCreationErrorMessages().orderNumberIsNotNumeric).isNumeric();
            req.checkBody("name", errorMessages.getStaffMemberCreationErrorMessages().nameIsNotAlphabeticalWithSpaces).matches(regularExpressions.getStaffMemberFieldPatterns().name);
            req.checkBody("title", errorMessages.getStaffMemberCreationErrorMessages().titleIsNotAlphabeticalWithSpaces).matches(regularExpressions.getStaffMemberFieldPatterns().title);
            req.checkBody("bio", errorMessages.getStaffMemberCreationErrorMessages().bioIsNotAcceptable).matches(regularExpressions.getStaffMemberFieldPatterns().bio);
            req.checkBody("whichUserCreated", errorMessages.getStaffMemberCreationErrorMessages().whichUserCreatedEmailIsInvalid).isEmail();
            req.checkBody("whichUserLastChanged", errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid).isEmail();
        } else if (req.method === "PATCH") {
            req.checkBody("groupName", errorMessages.getStaffMemberCreationErrorMessages().groupNameIsNotAlphabeticalWithSpaces).matches(regularExpressions.getStaffMemberFieldPatterns().groupName).optional();
            req.checkBody("orderNumber", errorMessages.getStaffMemberCreationErrorMessages().orderNumberIsNotNumeric).isNumeric().optional();
            req.checkBody("name", errorMessages.getStaffMemberCreationErrorMessages().nameIsNotAlphabeticalWithSpaces).matches(regularExpressions.getStaffMemberFieldPatterns().name).optional();
            req.checkBody("title", errorMessages.getStaffMemberCreationErrorMessages().titleIsNotAlphabeticalWithSpaces).matches(regularExpressions.getStaffMemberFieldPatterns().title).optional();
            req.checkBody("bio", errorMessages.getStaffMemberCreationErrorMessages().bioIsNotAcceptable).matches(regularExpressions.getStaffMemberFieldPatterns().bio).optional();
            req.checkBody("whichUserCreated", errorMessages.getStaffMemberCreationErrorMessages().whichUserCreatedEmailIsInvalid).isEmail().optional();
            req.checkBody("whichUserLastChanged", errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid).isEmail().optional();
        //     req.checkBody({"month": {
        //             optional: true,
        //             isNumeric: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().monthIsNotNumeric
        //             }
        //         }});
        //     req.checkBody({"day": {
        //             optional: true,
        //             isNumeric: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().dayIsNotNumeric
        //             }
        //         }});
        //     req.checkBody({"totalMeals": {
        //             optional: true,
        //             isNumeric: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().totalMealsIsNotNumeric
        //             }
        //         }});
        //     req.checkBody({"adultGuestMeals": {
        //             optional: true,
        //             isNumeric: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().adultGuestMealsIsNotNumeric
        //             }
        //         }});
        //     req.checkBody({"childGuestMeals": {
        //             optional: true,
        //             isNumeric: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().childGuestMealsIsNotNumeric
        //             }
        //         }});
        //     req.checkBody({"volunteerMeals": {
        //             optional: true,
        //             isNumeric: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().volunteerMealsIsNotNumeric
        //             }
        //         }});
        //     req.checkBody({"whichUserCreated": {
        //             optional: true,
        //             isEmail: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().whichUserCreatedEmailIsInvalid
        //             }
        //         }});
        //     req.checkBody({"whichUserLastChanged": {
        //             optional: true,
        //             isEmail: {
        //                 errorMessage: errorMessages.getStaffMemberCreationErrorMessages().whichUserLastChangedEmailIsInvalid
        //             }
        //         }});
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
