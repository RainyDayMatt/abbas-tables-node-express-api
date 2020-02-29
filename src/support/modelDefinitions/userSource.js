module.exports = {
    getDefinition(types) {
        const errorMessages = require("../dictionaries/errorMessages").getUserCreationErrorMessages();
        return {
            email: {
                allowNull: false,
                unique: true,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: errorMessages.emailIsInvalid
                    }
                }
            },
            password: {
                allowNull: false,
                type: types.STRING
            },
            firstName: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isAlpha: {
                        msg: errorMessages.firstNameIsNotAlphabetic
                    },
                    isLength: {
                        min: 2,
                        max: 20,
                        msg: errorMessages.firstNameLengthIsInvalid
                    }
                }
            },
            lastName: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isAlpha: {
                        msg: errorMessages.lastNameIsNotAlphabetic
                    },
                    isLength: {
                        min: 2,
                        max: 20,
                        msg: errorMessages.lastNameLengthIsInvalid
                    }
                }
            },
            mobilePhone: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isLength: {
                        min: 10,
                        max: 10,
                        msg: errorMessages.mobilePhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: errorMessages.mobilePhoneIsNotNumeric
                    }
                }
            },
            homePhone: {
                allowNull: true,
                type: types.STRING,
                validate: {
                    isLength: {
                        min: 10,
                        max: 10,
                        msg: errorMessages.homePhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: errorMessages.homePhoneIsNotNumeric
                    }
                }
            },
            workPhone: {
                allowNull: true,
                type: types.STRING,
                validate: {
                    isLength: {
                        min: 10,
                        max: 10,
                        msg: errorMessages.workPhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: errorMessages.workPhoneIsNotNumeric
                    }
                }
            },
            otherPhone: {
                allowNull: true,
                type: types.STRING,
                validate: {
                    isLength: {
                        min: 10,
                        max: 10,
                        msg: errorMessages.otherPhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: errorMessages.otherPhoneIsNotNumeric
                    }
                }
            },
            canEnterMealCount: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canEnterMealCountIsNotBoolean
                    }
                }
            },
            canChangeProps: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canChangePropsIsNotBoolean
                    }
                }
            },
            canCreateNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canCreateNewsItemsIsNotBoolean
                    }
                }
            },
            canEditNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canEditNewsItemsIsNotBoolean
                    }
                }
            },
            canDeleteNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canDeleteNewsItemsIsNotBoolean
                    }
                }
            },
            canCreateNewsItemComments: {
                defaultValue: true,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canCreateNewsItemCommentsIsNotBoolean
                    }
                }
            },
            canEditNewsItemComments: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canEditNewsItemCommentsIsNotBoolean
                    }
                }
            },
            canDeleteNewsItemComments: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canDeleteNewsItemCommentsIsNotBoolean
                    }
                }
            },
            canChangeRoles: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: errorMessages.canChangeRolesIsNotBoolean
                    }
                }
            }
        };
    },
    getFields() {
        return [
            "email",
            "password",
            "firstName",
            "lastName",
            "mobilePhone",
            "homePhone",
            "workPhone",
            "otherPhone",
            "canEnterMealCount",
            "canChangeProps",
            "canCreateNewsItems",
            "canEditNewsItems",
            "canDeleteNewsItems",
            "canCreateNewsItemComments",
            "canEditNewsItemComments",
            "canDeleteNewsItemComments",
            "canChangeRoles"
        ];
    }
};
