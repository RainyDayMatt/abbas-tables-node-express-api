'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
                validate: {
                    isEmail: {
                        msg: "Must be a valid email."
                    }
                }
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    isAlpha: {
                        msg: "Must consist only of letters."
                    }
                }
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    isAlpha: {
                        msg: "Must consist only of letters."
                    }
                }
            },
            canEnterMealCount: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canChangeProps: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canCreateNewsItems: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canEditNewsItems: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canDeleteNewsItems: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canCreateNewsItemComments: {
                defaultValue: true,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canEditNewsItemComments: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canDeleteNewsItemComments: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            canChangeRoles: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
                validate: {
                    isBoolean: {
                        msg: "Must be a boolean."
                    }
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
