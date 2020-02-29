'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const servingSummarySource = require("../../support/modelDefinitions/servingSummarySource").getDefinition(Sequelize);
        servingSummarySource.id = {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        };
        servingSummarySource.createdAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        servingSummarySource.updatedAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        return queryInterface.createTable('ServingSummaries', servingSummarySource);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ServingSummaries');
    }
};
