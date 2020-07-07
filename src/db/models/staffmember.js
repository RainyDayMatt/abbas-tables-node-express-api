'use strict';
const errorMessages = require("../../support/dictionaries/errorMessages").getStaffMemberCreationErrorMessages();
module.exports = (sequelize, DataTypes) => {
    const staffMemberSource = require("../../support/modelDefinitions/staffMemberSource").getDefinition(DataTypes);
    var StaffMember = sequelize.define('StaffMember', staffMemberSource, {});
    StaffMember.associate = function(models) {
        // associations can be defined here
    };
    return StaffMember;
};
