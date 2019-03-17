'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    groupName: DataTypes.STRING
  }, {});
  UserGroup.associate = function(models) {
    UserGroup.belongsToMany(models.User, {through: 'UserGroupLink'})
  };
  return UserGroup;
};