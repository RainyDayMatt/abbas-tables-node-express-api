module.exports = {
    getDefinition(types) {
        const validationMessages = require("../dictionaries/errorMessages").getPropertyCreationErrorMessages();
        return {
            key: {
                allowNull: false,
                unique: true,
                type: types.STRING
            },
            value: {
                allowNull: false,
                type: types.STRING
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
                        msg: validationMessages.whichUserCreatedEmailIsInvalid
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
