import Api from '@/services/Api'

export default {
  index () {
    return Api().get('referrals/index')
  },
  show (referralId) {
    return Api().get(`referrals/${referralId}`)
  },
  post (referralData) {
    return Api().post('referrals/add', referralData)
  }
}

// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
