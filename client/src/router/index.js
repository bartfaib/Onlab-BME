import Vue from 'vue'
import Router from 'vue-router'
import PCs from '@/components/PCs'
import NewPC from '@/components/NewPC'
import EditPC from '@/components/EditPC'
import Login from '@/components/Login'
import Register from '@/components/Registration'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/PCs',
      name: 'PCs',
      component: PCs
    },
    {
      path: '/PCs/new',
      name: 'NewPC',
      component: NewPC
    },
    {
      path: '/PCs/:id',
      name: 'EditPC',
      component: EditPC
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
