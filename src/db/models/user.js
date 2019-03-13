'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "Must be a valid email."
                }
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isAlpha: {
                    msg: "Must consist only of letters."
                }
            }
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isAlpha: {
                    msg: "Must consist only of letters."
                }
            }
        },
        canEnterMealCount: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canChangeProps: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canCreateNewsItems: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canEditNewsItems: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canDeleteNewsItems: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canCreateNewsItemComments: {
            defaultValue: true,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canEditNewsItemComments: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canDeleteNewsItemComments: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        },
        canChangeRoles: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
            validate: {
                isBoolean: {
                    msg: "Must be a boolean."
                }
            }
        }
    }, {});
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};
