import Vue from 'vue'
import 'lib-flexible/flexible'
import VeeValidate from 'vee-validate'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue';
import store from './vuex/store'
import Star from "./components/star/star.vue";
import Food from "./components/Food/Food.vue";
import './validate'
import * as API from '@/api'
import './mock/mock-server'
Vue.config.productionTip = false

// 注册全局组件
Vue.use(VeeValidate)
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('Food', Food) 
Vue.component(Button.name, Button)  // mt-button

//把所有请求挂在vm原型
Vue.prototype.$API = API

new Vue({
  mode:history,
 
  render: h => h(App),
  // 所有组件都能通过$router属性看到router对象  
  // 所有组件都有了一个代表当前路由的data数据: $route
  router,
  store,
}).$mount('#app')