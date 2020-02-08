'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const propertySource = require("../../support/modelDefinitions/propertySource").getDefinition(Sequelize);
        propertySource.id = {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        };
        propertySource.createdAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        propertySource.updatedAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        return queryInterface.createTable('Properties', propertySource);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Properties');
    }
};
