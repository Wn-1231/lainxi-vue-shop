//写路由器
import Vue from 'vue';
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'

//声明使用
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [{
      path: '/msite',
      component: Msite
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/Search',
      component: Search
    },
    // 自动重定向的路由
    {
      path: '/',
      redirect: '/msite'
    }
    
   

  ]

})