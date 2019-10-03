'use strict';
module.exports = (sequelize, DataTypes) => {
    var Property = sequelize.define('Property', {
        key: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        value: {
            allowNull: false,
            type: DataTypes.STRING
        },
        whichUserCreated: {
            allowNull: false,
            type: DataTypes.STRING
        },
        whichUserLastChanged: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {});
    Property.associate = function(models) {
        // associations can be defined here
    };
    return Property;
};
