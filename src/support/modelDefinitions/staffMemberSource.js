module.exports = {
    getDefinition(types) {
        const errorMessages = require("../dictionaries/errorMessages").getStaffMemberCreationErrorMessages();
        return {
            groupName: {
                allowNull: false,
                type: types.STRING
            },
            orderNumber: {
                allowNull: false,
                type: types.INTEGER
            },
            name: {
                allowNull: false,
                type: types.STRING
            },
            title: {
                allowNull: false,
                type: types.STRING
            },
            bio: {
                allowNull: false,
                type: types.STRING(1000)
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
