// import Vue from 'vue'
// import VueRouter from 'vue-router'


// Vue.useAttrs(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignIn.vue') },
      { path: '/signup', component: () => import('pages/SignUp.vue') },
      { path: '/home', component: () => import('pages/home.vue')},
      { path: '/myInfo', component: () => import('pages/myInfo.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   rotues
// })

export default routes
