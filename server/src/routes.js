const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ReferralsController = require('./controllers/ReferralsController')
const UserController = require('./controllers/UserController')
const {AuthFilter, AuthAdminFiltert} = require('./policies/AuthenticationFilter')



module.exports = (app) => {

    app.all("/admin/*", AuthAdminFiltert, function(req, res, next) {
        next();
      })

    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post('/login', 
        AuthenticationController.login)

    app.get('/referrals/index',
        AuthFilter,
        ReferralsController.index)

    app.post('/referrals/add',
        ReferralsController.add)

    app.post('/referrals/delete',
        AuthFilter,
        ReferralsController.delete)

    app.get('/referrals/:referralId',
        AuthFilter,
        ReferralsController.show)

    app.put('/referrals/:referralId',
        AuthFilter,
        ReferralsController.put)

    app.get('/user',
        AuthFilter,
        UserController.index)

    app.put('/user/:userId',
        AuthFilter,
        UserController.put)

    app.post('/user/:userId/delete',
        AuthFilter,
        UserController.delete)

    app.post('/groups',
        AuthFilter,
        UserController.groups)
}
