module.exports = {
    getDefinition(types) {
        const validationMessages = require("../../support/dictionary").getValidationMessages();
        return {
            email: {
                allowNull: false,
                unique: true,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: validationMessages.emailIsInvalid
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
                        msg: validationMessages.firstNameIsNotAlphabetic
                    },
                    isLength: {
                        min: 2,
                        max: 20,
                        msg: validationMessages.firstNameLengthIsInvalid
                    }
                }
            },
            lastName: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isAlpha: {
                        msg: validationMessages.lastNameIsNotAlphabetic
                    },
                    isLength: {
                        min: 2,
                        max: 20,
                        msg: validationMessages.lastNameLengthIsInvalid
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
                        msg: validationMessages.mobilePhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: validationMessages.mobilePhoneIsNotNumeric
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
                        msg: validationMessages.homePhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: validationMessages.homePhoneIsNotNumeric
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
                        msg: validationMessages.workPhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: validationMessages.workPhoneIsNotNumeric
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
                        msg: validationMessages.otherPhoneLengthIsInvalid
                    },
                    isNumeric: {
                        msg: validationMessages.otherPhoneIsNotNumeric
                    }
                }
            },
            canEnterMealCount: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canEnterMealCountIsNotBoolean
                    }
                }
            },
            canChangeProps: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canChangePropsIsNotBoolean
                    }
                }
            },
            canCreateNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canCreateNewsItemsIsNotBoolean
                    }
                }
            },
            canEditNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canEditNewsItemsIsNotBoolean
                    }
                }
            },
            canDeleteNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canDeleteNewsItemsIsNotBoolean
                    }
                }
            },
            canCreateNewsItemComments: {
                defaultValue: true,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canCreateNewsItemCommentsIsNotBoolean
                    }
                }
            },
            canEditNewsItemComments: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canEditNewsItemCommentsIsNotBoolean
                    }
                }
            },
            canDeleteNewsItemComments: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canDeleteNewsItemCommentsIsNotBoolean
                    }
                }
            },
            canChangeRoles: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: validationMessages.canChangeRolesIsNotBoolean
                    }
                }
            }
        };
    }
};
