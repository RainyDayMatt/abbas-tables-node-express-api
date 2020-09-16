'use strict';
const errorMessages = require("../../support/dictionaries/errorMessages").getStaffMemberCreationErrorMessages();
module.exports = {
    up: (queryInterface, Sequelize) => {
        const staffMemberSource = require("../../support/modelDefinitions/staffMemberSource").getDefinition(Sequelize);
        staffMemberSource.id = {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        };
        staffMemberSource.createdAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        staffMemberSource.updatedAt = {
            allowNull: false,
            type: Sequelize.DATE
        };
        return queryInterface.createTable('StaffMembers', staffMemberSource);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('StaffMembers');
    }
};
