/* 
商家模块相关数据管理
*/
import Vue from 'vue'
import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SHOP
} from '../mutations_type'

import { getCartFoods } from "../../utils/index";
import {
  // reqGoods,
  // reqRatings,
  // reqInfo
  reqShop

} from '../../api/index'

export default  {
  state: { 
    // goods: [], // 商品列表
    // ratings: [], // 商家评价列表
    // info: {}, // 商家信息
    cartFoods: [], // 购物车中所有food数组
    shop:{}
  },
  mutations: {
    /* [RECEIVE_INFO](state, {info}) {
      state.info = info
    },
    
    [RECEIVE_RATINGS](state, {ratings}) {
      state.ratings = ratings
    },
    
    [RECEIVE_GOODS](state, {goods}) {
      state.goods = goods
    }, */
  
    [ADD_FOOD_COUNT](state, {food}) {
      if (food.count) { // food有count
        food.count++
      } else {
       
        Vue.set(food, 'count', 1)
        state.cartFoods.push(food)
      }
    },
  
    [REDUCE_FOOD_COUNT](state, {food}) {
      if (food.count>0) { // 只有数量大于0时
        food.count--
        if ( food.count ===0) {
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }
    },

    [CLEAR_CART] (state) {
      state.cartFoods.forEach(food => food.count = 0)
      state.cartFoods = []
    },

    [RECEIVE_SHOP](state,{shop={}, cartFoods=[]}){
      state.shop = shop
      state.cartFoods = cartFoods
    }
  },
  actions: {
  /*   // 异步获取商家信息
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
    }, */

    /* 
    更新food中的数量的同步action
    */
    updateFoodCount ({commit}, {isAdd, food}) {
      if (isAdd) {
        commit(ADD_FOOD_COUNT, {food})
      } else {
        commit(REDUCE_FOOD_COUNT, {food})
      }
    },
    

    //获取对应的商品列表
    async getShop({commit, state}, id) {

      if (state.shop.id==id) {
        return
      }
       if (state.shop.id) {  //每次点击下一次的shop，清空上一次的shop，再去请求
        commit(RECEIVE_SHOP, {}) 
      }
      console.log('发请求');
      let result = await reqShop(id)
      if (result) {
        let shop = result.data
        let cartFoods = getCartFoods(shop)
        commit(RECEIVE_SHOP, {shop,cartFoods})
      }

    }
  },
  getters: { 
    /* 
    调用时机: 
      1. 初始显示
      2. 依赖数据发生改变   ===> 效率低
    */
    /* cartFoods (state) {
      const arr = []
      state.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count>0) {
            arr.push(food)
          }
        })
      })

      return arr
    } */
    /* 总数量 */ //计算属性记得return    
    totalCount (state) {
      return state.cartFoods.reduce((pre, food) => pre + food.count, 0)   //只能用箭头
    },

   
    /* 总价格 */
    totalPrice (state) {
      return state.cartFoods.reduce((pre, food) => pre + food.count*food.price, 0)
    },
  }
}