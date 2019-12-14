import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS
} from "./mutations_type.js";

export default {
  [RECEIVE_SHOPS](state, shop) {
    state.shops = shop
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys =categorys
  },
  [RECEIVE_ADDRESS](state, address) {
    state.shops= address
  }




}