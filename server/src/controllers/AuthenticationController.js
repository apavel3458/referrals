const {User} = require('../models')


module.exports = {
    async registerr(req, res) {
        try {
            const user = await User.create(req.body)
            res.send({
                user: user.toJSON(),
                message: `Registration for user ${req.body.email} completed!`
            })
        } catch (err) {
            res.status(400).send({
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
                    error: 'The login information is incorrect'
                })
            }

            const isPasswordValid = password === user.password
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information is incorrect'
                })
            }

            res.send({
                user: user.toJSON()
            })

            res.send({
                user: user.toJSON()
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in.'
            })
        }
    }
}
