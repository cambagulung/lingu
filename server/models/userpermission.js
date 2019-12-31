"use strict";
module.exports = (sequelize, DataTypes) => {
  const userPermission = sequelize.define(
    "userPermission",
    {
      userId: DataTypes.INTEGER,
      permissionId: DataTypes.INTEGER
    },
    {}
  );
  userPermission.associate = function(models) {
    // associations can be defined here
  };
  return userPermission;
};
