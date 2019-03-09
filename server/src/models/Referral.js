/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

    // lastName: null,
    // firstName: null,
    // dob: null,
    // pin: null,
    // referringPerson: null,
    // referringEmail: null,
    // referringAttending: null,
    // dateSeenInER: new Date().toISOString().substr(0, 10),
    // comments: null,
    // testSelected: null

module.exports = (sequelize, DataTypes) => {
    const Referral = sequelize.define('Referral', {
        lastName: DataTypes.STRING,
        firstName: DataTypes.STRING,
        dob: DataTypes.DATE,
        pin: DataTypes.STRING,
        referringName: DataTypes.STRING,
        referringEmail: DataTypes.STRING,
        referringAttending: DataTypes.STRING,
        dateSeenInER: DataTypes.DATE,
        comments: DataTypes.TEXT,
        testSelected: DataTypes.STRING
    })

    return Referral
}