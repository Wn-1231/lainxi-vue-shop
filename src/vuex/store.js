import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import shop from './modules/shop'
import msite from './modules/msite'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({  //创建store核心对象
  actions,
  mutations,
  getters,
  modules: {
    msite,
    user,
    shop
  }
})