'use strict';
module.exports = (sequelize, DataTypes) => {
    const userSource = require("../../support/modelDefinitions/userSource").getDefinition(DataTypes);
    var User = sequelize.define('User', userSource, {});
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};
