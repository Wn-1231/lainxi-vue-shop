import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutations_type'
import { reqAddress,reqCategorys,reqShops } from "../api/index";
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
}

}