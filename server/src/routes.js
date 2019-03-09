const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ReferralsController = require('./controllers/ReferralsController')


module.exports = (app) => {
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post('/login', 
        AuthenticationController.login)

    app.get('/referrals/index',
        ReferralsController.index)

    app.post('/referrals/add',
        ReferralsController.add)

    app.get('/referrals/:referralId',
        ReferralsController.show)
}
