import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,


} from './mutations_type'
import { reqAddress,reqCategorys,reqShops,reqAutoLogin,reqInfo,reqGoods,reqRatings } from "../api/index";
import { Toast, MessageBox } from 'mint-ui'
export default {
  //获取地址
  async getAddress({commit,state}){
    const {longitude, latitude} = state
    // 发异步请求
    const result = await reqAddress(longitude, latitude)
    // 请求成功后, 提交给mutation
    console.log(result);
    if (result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  //获取分类列表
  async getCategorys ({commit}) {
    // 发异步请求
    const result = await reqCategorys()
    // 请求成功后, 提交给mutation
    if (result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },

    /* 
    获取商家数组的异步action
    */
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    // 发异步请求
    const result = await reqShops({longitude, latitude})
    // 请求成功后, 提交给mutation
    if (result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
},
    saveUser({commit},user){
      //保存到本地
      const token = user.token
      // 将token保存local
      localStorage.setItem('token_key', token)
      console.log(user);

      // 将token保存到state
      commit(RECEIVE_USER, {user})
      // 将user保存到state
      commit(RECEIVE_TOKEN, {token})
 
    },

    //自动等路
    async autoLogin({commit,state}){

      if (state.token && !state.user._id) {
        let result = await reqAutoLogin()
        let user = result.data
        commit(RECEIVE_USER,{user})
      }
    },
    //注销退出登录
    logout ({commit}) {
      localStorage.removeItem('token_key')
      commit(RESET_USER)
      commit(RESET_TOKEN)
    },
      // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})

      typeof cb==='function' && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      typeof cb==='function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      typeof cb==='function' && cb()
    }
  },

}