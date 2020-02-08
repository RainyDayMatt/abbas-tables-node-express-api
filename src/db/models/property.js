'use strict';
module.exports = (sequelize, DataTypes) => {
    const propertySource = require("../../support/modelDefinitions/propertySource").getDefinition(DataTypes);
    var Property = sequelize.define('Property', propertySource, {});
    Property.associate = function(models) {
        // associations can be defined here
    };
    return Property;
};
