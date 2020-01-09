module.exports = {
    getDefinition(types) {
        return {
            email: {
                allowNull: false,
                unique: true,
                type: types.STRING,
                validate: {
                    isEmail: {
                        msg: "Must be a valid email."
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
                        msg: "Must consist only of letters."
                    }
                }
            },
            lastName: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isAlpha: {
                        msg: "Must consist only of letters."
                    }
                }
            },
            mobilePhone: {
                allowNull: false,
                type: types.STRING,
                validate: {
                    isNumeric: {
                        msg: "Must consist only of numbers."
                    }
                }
            },
            homePhone: {
                allowNull: true,
                type: types.STRING,
                validate: {
                    isNumeric: {
                        msg: "Must consist only of numbers."
                    }
                }
            },
            workPhone: {
                allowNull: true,
                type: types.STRING,
                validate: {
                    isNumeric: {
                        msg: "Must consist only of numbers."
                    }
                }
            },
            otherPhone: {
                allowNull: true,
                type: types.STRING,
                validate: {
                    isNumeric: {
                        msg: "Must consist only of numbers."
                    }
                }
            },
            canEnterMealCount: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canChangeProps: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canCreateNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canEditNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canDeleteNewsItems: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canCreateNewsItemComments: {
                defaultValue: true,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canEditNewsItemComments: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canDeleteNewsItemComments: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canChangeRoles: {
                defaultValue: false,
                type: types.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            }
        };
    }
};
