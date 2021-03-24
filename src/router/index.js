import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  




  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/bookshop',
        name: 'Bookshop',
        component: () => import('../views/Bookshop.vue'),
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: '/bookshelf',
        name: 'Bookshelf',
        component: () => import('../views/Bookshelf.vue'),
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
      },
    ]

  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('../views/Rank.vue'),
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('../views/Classify.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/newbook',
    name: 'Newbook',
    component: () => import('../views/Newbook.vue'),
  },
  {
    path: '/boutique',
    name: 'Boutique',
    component: () => import('../views/Boutique.vue'),
  },
  {
    path: '/secure',
    name: 'Secure',
    component: () => import('../views/Secure.vue')
  },
  {
      path: '/account',
      name: 'Account',
      component: () => import('../views/Account.vue')
  },
  {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
  },
  {
    path: '/readbook',
    name: 'Readbook',
    component: () => import('../views/Readbook.vue')
  },
  {
    path: '/fofgot',
    name: 'Forgot',
    component: () => import('../views/Forgot.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('../views/Info.vue')
  },
  {
    path: '/respon',
    name: 'Respon',
    component: () => import('../views/Respon.vue')
  },
  {
    path: '/type',
    name: 'Type',
    component: () => import('../views/Type.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue')
  },
  {
    path: '*',
    redirect: {
       path: '/bookshop',
        name: 'Bookshop'
    }
}
  
]

const router = new VueRouter({
  routes
})

export default router
