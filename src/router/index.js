import Vue from 'vue'
import VueRouter from 'vue-router'
import LOGIN from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LOGIN',
    component: LOGIN
  },
  {
    path: '/Mod',
    name: 'Mod',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mod.vue')
  },
  {
    path: '/HOME',
    name: 'HOME',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
