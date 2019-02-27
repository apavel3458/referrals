const {User} = require('../models')


module.exports = {
    async register(req, res) {
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
    }
}
