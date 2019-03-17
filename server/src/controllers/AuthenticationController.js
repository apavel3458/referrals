/* eslint-disable no-console */
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const request = require('request')

function jwtSignUser(user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

function assessCaptcha(req, res) {
    const token = req.body.recaptchaToken
    if (token === undefined || token === '' || token === null) {
        res.status(403).send({
            error: 'Please select captcha'
        })
        return false
    }
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${config.authentication.captchaSecretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body)
        if (body.success !== undefined && !body.success) {
            res.status(403).send({
                error: 'Please select captcha'
            })
            return false
        }
    })
    return true
}

module.exports = {
    async register(req, res) {
        try {
            const captchaPassed = assessCaptcha(req, res)
            console.log('CAPATCH APASSED: ' + captchaPassed)
            if (!captchaPassed) return

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
                return res.status(403).send({
                    error: 'The login information is incorrect'
                })
            }
            
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information is incorrect'
                })
            }
            
            const userJson = user.toJSON()
            return res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                error: 'An error has occured trying to log in.'
            })
        }
    }
}
