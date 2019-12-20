export default {
  yyy({commit, state}) { // state是总的state
    commit('xxx') // commit内部会查找所有匹配的mutation(总的和每个模块的)
  }
}
