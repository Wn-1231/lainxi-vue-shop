import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS
} from "./mutations_type.js";

export default {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
}