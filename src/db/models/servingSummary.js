'use strict';
module.exports = (sequelize, DataTypes) => {
    const servingSummarySource = require("../../support/modelDefinitions/servingSummarySource").getDefinition(DataTypes);
    var ServingSummary = sequelize.define('ServingSummary', servingSummarySource, {});
    ServingSummary.associate = function(models) {
        // associations can be defined here
    };
    return ServingSummary;
};
