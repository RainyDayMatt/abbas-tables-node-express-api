const fieldPatterns = require("../../support/dictionaries/regularExpressions").getStaffMemberFieldPatterns();

module.exports = {
    getDefinition(types) {
        const errorMessages = require("../dictionaries/errorMessages").getStaffMemberCreationErrorMessages();
        return {
            groupName: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    is: {
                        args: [ fieldPatterns.groupName ],
                        msg: errorMessages.groupNameIsNotAlphabeticalWithSpaces
                    }
                }
            },
            orderNumber: {
                allowNull: false,
                type: types.INTEGER,
                validate: {
                    isNumeric: {
                        msg: errorMessages.orderNumberIsNotNumeric
                    }
                }
            },
            name: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    is: {
                        args: [ fieldPatterns.name ],
                        msg: errorMessages.nameIsNotAlphabeticalWithSpaces
                    }
                }
            },
            title: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    is: {
                        args: [ fieldPatterns.title ],
                        msg: errorMessages.titleIsNotAlphabeticalWithSpaces
                    }
                }
            },
            bio: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    is: {
                        args: [ fieldPatterns.bio ],
                        msg: errorMessages.bioIsNotAcceptable
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
                        msg: errorMessages.whichUserCreatedEmailIsInvalid
                    }
                }
            }
        };
    },
    getFields() {
        return [
            "groupName",
            "orderNumber",
            "name",
            "title",
            "bio",
            "whichUserCreated",
            "whichUserLastChanged"
        ];
    }
};
