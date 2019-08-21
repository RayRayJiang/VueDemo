import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import GoodsDetail from './views/GoodsDetail.vue'
import CakeList from './views/CakeList.vue'
import BreakfastList from './views/BreakfastList.vue'
import CarList from './views/CarList.vue'
import Userinfo from './views/Userinfo.vue'
import Settlement from './views/Settlement.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 根路径
      redirect: '/home' // 重定向到首页
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods/detail/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/goods/cake',
      name: 'CakeList',
      component: CakeList
    },
    {
      path: '/goods/breakfast',
      name: 'BreakfastList',
      component: BreakfastList
    },
    {
      path: '/goods/carlist',
      name: 'CarList',
      component: CarList
    },
    {
      path: '/userinfo',
      name: 'Userinfo',
      component: Userinfo
    },
    {
      path: '/goods/settlement/:id',
      name: 'Settlement',
      component: Settlement
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
