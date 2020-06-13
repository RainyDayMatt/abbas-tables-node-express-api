module.exports = {
    getDefinition(types) {
        const errorMessages = require("../dictionaries/errorMessages").getPropertyCreationErrorMessages();
        return {
            key: {
                allowNull: false,
                unique: true,
                type: types.STRING
            },
            value: {
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
            "key",
            "value",
            "whichUserCreated",
            "whichUserLastChanged"
        ];
    }
};
