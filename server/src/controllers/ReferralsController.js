/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const {Referral} = require('../models')
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            let referral = null
            const search = req.query.search
            if (search) {
                referral = await Referral.findAll({
                    where: {
                        [Op.or]: [
                            'lastName', 'firstName', 'referringName', 'referringAttending'
                        ].map( key => ({
                            [key]: {
                                [Op.like]: `%${search}%` 
                            }
                        }))
                    }
                })
            } else {
                referral = await Referral.findAll({
                    limit: 10
                })
            }
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
            const referral = await Referral.findByPk(req.params.referralId)
            res.send(referral)
        } catch (err) {
            console.log("Error: ", err)
            res.status(500).send({
                error: 'An error has occured trying to fetch referrals.'
            })
        }
    },

    async put(req, res) {
        try {
            const referral = await Referral.update(req.body, {
                where: {
                    id: req.params.referralId
                }
            })
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
    },

    async delete(req, res) {
        try {
            //const referral = await Referral.findById(req.params.referralId)
            Referral.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.send(true)
        } catch (err) {
            console.log("Error: ", err)
            res.status(500).send({
                error: 'An error has occured trying to fetch referrals.'
            })
        }
    },

    
}
