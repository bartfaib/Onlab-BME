import Api from '@/services/Api'

export default {
  fetchUser () {
    return Api().get('Users')
  },
  addUser (params) {
    return Api().post('Users', params)
  },
  updateUser (params) {
    return Api().put('Users/' + params.id, params)
  },
  getUser (params) {
    return Api().get('Users/' + params.id)
  },
  deleteUser (id) {
    return Api().delete('Users/' + id)
  }
}
