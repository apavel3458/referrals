/* eslint-disable no-console */
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                message: `Registration for user ${req.body.email} completed!`,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(403).send({
                error: 'This email account is already in use.'
            })
        }
    },

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            
            if (!user) {
                res.status(403).send({
                    error: 'The login information is incorrect (no user)'
                })
            }
            
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information is incorrect (bad pw)'
                })
            }
            
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })

            res.send({
                user: user.toJSON()
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to log in.'
            })
        }
    }
}
