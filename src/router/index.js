import { createRouter, createWebHistory } from 'vue-router'

//import store for authentication
import store from '../store'

import Home from '../views/Home.vue'

//my created pages
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import Leads from '../views/dashboard/Leads.vue'
import AddLead from '../views/dashboard/AddLead.vue'
import Lead from '../views/dashboard/Lead.vue'
import EditLead from '../views/dashboard/EditLead.vue'
import AddTeam from '../views/dashboard/AddTeam.vue'
import AddMember from '../views/dashboard/AddMember.vue'
import Team from '../views/dashboard/Team.vue'
import Clients from '../views/dashboard/Clients.vue'
import Client from '../views/dashboard/Client.vue'
import AddClient from '../views/dashboard/AddClient.vue'
import EditClient from '../views/dashboard/EditClient.vue'
import AddNote from '../views/dashboard/AddNote.vue'
import EditNote from '../views/dashboard/EditNote.vue'

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
  },
  {
    path: '/dashboard/leads',
    name: 'Leads',
    component: Leads,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/leads/add',
    name: 'AddLead',
    component: AddLead,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/leads/:id', //create a dyamic route that will pick a user with id
    name: 'Lead',
    component: Lead,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/leads/:id/edit', //create a dyamic route that will pick a user with id
    name: 'EditLead',
    component: EditLead,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/add-team',
    name: 'AddTeam',
    component: AddTeam,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/team',
    name: 'Team',
    component: Team,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/add-member',
    name: 'AddMember',
    component: AddMember,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/add',
    name: 'AddClient',
    component: AddClient,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/:id', //create a dyamic route that will pick a user with id
    name: 'Client',
    component: Client,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/:id/edit', //create a dyamic route that will pick a user with id
    name: 'EditClient',
    component: EditClient,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/:id/add-note', //create a dyamic route that will pick a user with id
    name: 'AddNote',
    component: AddNote,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/clients/:id/edit-note', //create a dyamic route that will pick a user with id
    name: 'EditNote',
    component: EditNote,
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
  if(to.matched.some(record=> record.meta.requireLogin) && !store.state.isAuthenticated){
    //if not authenticated go back to login page
    next('/log-in')
  }else{
    //if authenticated go to the page he wanted (next)
    next()
  }
})

export default router
