//写路由器
import Vue from 'vue';
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/login/login.vue'
import Shop from '../pages/shop/shop.vue'
import Goods from '../pages/shop/Goods.vue'
import Ratings from '../pages/shop/Ratings.vue'
import Info from '../pages/shop/info.vue'

//声明使用
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [{
      path: '/msite',
      component: Msite,
      meta:{
        isShowLogin:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        isShowLogin:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        isShowLogin:true
      }
    },
    {
      path: '/Search',
      component: Search,
      meta:{
        isShowLogin:true
      }
    },
    {
      path: '/Login',
      component: Login,
    },
    {
      // name: 'shop',
      path: '/shop/:id',
      props: true,            // 将所有params参数转换成标签属性传递给子路由组件
                            // props: toRoute => ({id: toRoute.params.id})
      component: Shop,
      children: [
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          component: Ratings
        },
        {
          path: 'info',
          component: Info
        },
        {
          path: '',
          redirect: 'goods'
        }
      ]
    },
    
    
    // 自动重定向的路由
    {
      path: '/',
      redirect: '/msite'
    }
  ]

})