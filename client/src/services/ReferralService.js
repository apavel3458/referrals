import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('referrals/index', {
      params: {
        search: search
      }
    })
  },
  show (referralId) {
    return Api().get(`referrals/${referralId}`)
  },
  post (referralData) {
    return Api().post('referrals/add', referralData)
  },
  delete (referralData) {
    return Api().post('referrals/delete', referralData)
  },
  put (referralData) {
    return Api().put(`referrals/${referralData.id}`, referralData)
  }
}

// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
