module.exports = {
    getDefinition(types) {
        const errorMessages = require("../dictionaries/errorMessages").getServingSummaryCreationErrorMessages();
        return {
            year: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.yearIsNotNumeric
                    }
                }
            },
            month: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.monthIsNotNumeric
                    }
                }
            },
            day: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.dayIsNotNumeric
                    }
                }
            },
            totalMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.totalMealsIsNotNumeric
                    }
                }
            },
            adultGuestMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.adultGuestMealsIsNotNumeric
                    }
                }
            },
            childGuestMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.childGuestMealsIsNotNumeric
                    }
                }
            },
            volunteerMeals: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.volunteerMealsIsNotNumeric
                    }
                }
            },
            whichUserCreated: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: errorMessages.whichUserCreatedEmailIsInvalid
                    }
                }
            },
            whichUserLastChanged: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: errorMessages.whichUserLastChangedEmailIsInvalid
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
                        msg: errorMessages.hadIncidentIsNotBoolean
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
