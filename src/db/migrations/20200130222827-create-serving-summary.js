'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const servingsummarySource = require("../../support/modelDefinitions/servingsummarySource").getDefinition(Sequelize);
        servingsummarySource.id = {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        };
        servingsummarySource.createdAt = {
            allowNull: false,
                type: Sequelize.DATE
        };
        servingsummarySource.updatedAt = {
            allowNull: false,
                type: Sequelize.DATE
        };
        return queryInterface.createTable('ServingSummaries', servingsummarySource);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ServingSummaries');
    }
};
