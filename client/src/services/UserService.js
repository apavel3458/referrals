import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('user', {
      params: {
        search: search
      }
    })
  },
  put (user) {
      return Api().put(`user/${user.id}`, user)
  },
  delete (user) {
    return Api().post(`user/${user.id}/delete`, user)
  },
  groups () {
    return Api().post(`groups`)
  }
}

// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
