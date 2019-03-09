import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CreateReferral from '@/components/referral/CreateReferral'
import ViewReferral from '@/components/referral/ViewReferral'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: CreateReferral
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/referrals/create',
      name: 'CreateReferral',
      component: CreateReferral
    },
    {
      path: '/referrals/:referralId',
      name: 'referral',
      component: ViewReferral
    }
  ]
})
