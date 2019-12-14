import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({  //创建store核心对象
  Vue,
  actions,
  mutations,
  state,
  getters
})