import { createRouter, createWebHistory } from 'vue-router'

//import store for authentication
import store from '../store'

import Home from '../views/Home.vue'

//my created pages
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin:true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from,next)=>{
  if(to.matched.some(record=> record.meta.requireLogin)&&!store.state.isAuthenticated){
    //if not authenticated go back to login page
    next('/log-in')
  }else{
    //if authenticated go to the page he wanted (next)
    next()
  }
})

export default router
