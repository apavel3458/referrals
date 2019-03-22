import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('admin/users', {
      params: {
        search: search
      }
    })
  },
  put (user) {
      return Api().put(`admin/users/${user.id}`, user)
  },
  delete (user) {
    return Api().post(`admin/users/${user.id}/delete`, user)
  },
  groups () {
    return Api().post(`admin/groups`)
  }
}

// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
