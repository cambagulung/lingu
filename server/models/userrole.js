"use strict";
module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define(
    "userRole",
    {
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER
    },
    {}
  );
  userRole.associate = function(models) {
    // associations can be defined here
  };
  return userRole;
};
