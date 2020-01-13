'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const userSource = require("../../support/modelDefinitions/userSource").getDefinition(Sequelize);
        userSource.id = {
            allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
        };
        userSource.createdAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        userSource.updatedAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        return queryInterface.createTable('Users', userSource);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
