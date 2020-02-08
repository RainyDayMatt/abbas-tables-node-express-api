module.exports = {
    getDefinition(types) {
        const validationMessages = require("../dictionaries/errorMessages").getServingSummaryValidationMessages();
        return {
            year: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.yearIsNotNumeric
                    }
                }
            },
            month: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.monthIsNotNumeric
                    }
                }
            },
            day: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.dayIsNotNumeric
                    }
                }
            },
            totalMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.totalMealsIsNotNumeric
                    }
                }
            },
            adultGuestMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.adultGuestMealsIsNotNumeric
                    }
                }
            },
            childGuestMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.childGuestMealsIsNotNumeric
                    }
                }
            },
            volunteerMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: validationMessages.volunteerMealsIsNotNumeric
                    }
                }
            },
            whichUserCreated: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: validationMessages.whichUserCreatedEmailIsInvalid
                    }
                }
            },
            whichUserLastChanged: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: validationMessages.whichUserLastChangedEmailIsInvalid
                    }
                }
            },
            notes: {
                type: types.STRING
            },
            hadIncident: {
                allowNull: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.hadIncidentIsNotBoolean
                    }
                }
            }
        };
    },
    getFields() {
        return [
            "year",
            "month",
            "day",
            "totalMeals",
            "adultGuestMeals",
            "childGuestMeals",
            "volunteerMeals",
            "whichUserCreated",
            "whichUserLastChanged",
            "notes",
            "hadIncident"
        ];
    }
};
