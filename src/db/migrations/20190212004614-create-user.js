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
        return queryInterface.createTable('Users', userSource);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
