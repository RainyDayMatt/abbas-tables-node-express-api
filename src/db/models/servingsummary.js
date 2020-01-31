'use strict';
module.exports = (sequelize, DataTypes) => {
    const servingsummarySource = require("../../support/modelDefinitions/servingsummarySource").getDefinition(DataTypes);
    var ServingSummary = sequelize.define('ServingSummary', servingsummarySource, {});
    ServingSummary.associate = function(models) {
        // associations can be defined here
    };
    return ServingSummary;
};
