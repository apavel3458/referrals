/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const {User} = require('../models')
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            let user = null
            const search = req.query.search
            if (search) {
                user = await User.findAll({
                    where: {
                        [Op.or]: [
                            'lastName', 'firstName', 'email'
                        ].map( key => ({
                            [key]: {
                                [Op.like]: `%${search}%` 
                            }
                        }))
                    }
                })
            } else {
                user = await User.findAll({
                    limit: 40
                })
            }

            res.send(user)
            
        } catch (err) {
            console.log("Error: ", err)
            res.status(500).send({
                error: 'An error has occured trying to fetch users.'
            })
        }
    },

    async put(req, res) {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.params.userId
                },
                individualHooks: true
            })
            res.send(user)
        } catch (err) {
            console.log("Error: ", err)
            res.status(500).send({
                error: 'An error has occured trying to fetch user.'
            })
        }
    },

    async delete(req, res) {
        try {
            //const user = await User.findOne(req.params.userId)
            User.destroy({
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
