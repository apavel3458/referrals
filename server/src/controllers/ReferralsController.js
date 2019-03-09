/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const {Referral} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const referral = await Referral.findAll({
                limit: 10
            })
            res.send(referral)
        } catch (err) {
            console.log("Error: ", err)
            res.status(500).send({
                error: 'An error has occured trying to fetch referrals.'
            })
        }
    },

    async show(req, res) {
        try {
            const referral = await Referral.findById(req.params.referralId)
            res.send(referral)
        } catch (err) {
            console.log("Error: ", err)
            res.status(500).send({
                error: 'An error has occured trying to fetch referrals.'
            })
        }
    },

    async add(req, res) {
        try {
            console.log(req.body)
            const referral = await Referral.create(req.body)
            console.log(referral)
            res.send(referral)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create a referral.'
            })
        }
    }

    
}
