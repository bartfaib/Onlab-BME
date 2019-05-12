import Api from '@/services/Api'

export default {
  fetchPC () {
    return Api().get('PCs')
  },
  addPC (params) {
    return Api().post('PCs', params)
  },
  updatePC (params) {
    return Api().put('PCs/' + params.id, params)
  },
  getPC (params) {
    return Api().get('PCs/' + params.id)
  },
  deletePC (id) {
    return Api().delete('PCs/' + id)
  }
}
