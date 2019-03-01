/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
//const bcrypt = require('bcrypt-nodejs')

// eslint-disable-next-line no-unused-vars
function hashPassword(user, options) {
    const SALT_FACTOR = 8
    if (!user.changed('password')) {
        return;
    }
    console.log("hash password changed")

    return bcrypt.genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword//,
            //beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (candidatePassword) {
        const result = bcrypt.compareSync(candidatePassword, this.password)
        return result
    }

    return User
}