import Vue from 'vue'
import 'lib-flexible/flexible'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router/index'
import Header from './components/Header/Header.vue';
import store from './vuex/store'
Vue.config.productionTip = false

// 注册全局组件
Vue.use(VeeValidate)
Vue.component('Header', Header)
new Vue({
 
  render: h => h(App),
  // 所有组件都能通过$router属性看到router对象  
  // 所有组件都有了一个代表当前路由的data数据: $route
  router,
  store
}).$mount('#app')