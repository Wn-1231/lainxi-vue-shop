import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'lib-flexible/flexible'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 所有组件都能通过$router属性看到router对象  
  // 所有组件都有了一个代表当前路由的data数据: $route
  router
}).$mount('#app')