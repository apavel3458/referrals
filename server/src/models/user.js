/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
'use strict';
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

// eslint-disable-next-line no-unused-vars
function hashPassword(user, options) {
  const SALT_FACTOR = 8
  console.log("HASHING........")
  if (!user.changed('password')) {
      return;
  }
  console.log("HASHING + CHANGING........")
  return bcrypt.genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(user.password, salt, null))
      .then(hash => {
          user.setDataValue('password', hash)
      })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: null
    }
  }, {
    hooks: {
        beforeSave: hashPassword
        //beforeUpdate: hashPassword
    }
});
  User.associate = function(models) {
    User.belongsToMany(models.UserGroup, {through: 'UserGroupLink'})
  };

  User.prototype.comparePassword = function (candidatePassword) {
    const result = bcrypt.compareSync(candidatePassword, this.password)
    return result
  }

  User.prototype.toJSON =  function () {
    //console.log("REMOVING PASSWORDS")
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  return User;
};