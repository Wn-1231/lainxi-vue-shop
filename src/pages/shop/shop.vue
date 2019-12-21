<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="`/shop/${this.id}/goods`" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${this.id}/ratings`" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${this.id}/info`" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div> 
</template>

<script type="text/ecmascript-6">
  import ShopHeader from "../../components/shopHeader/shopHeader";
  import { mapState } from "vuex";
  import { saveCartFoods } from "../../utils/index";
  export default {
    name:'Shop',
    props:['id'],
    computed:{
      ...mapState({
        //有shop和购物车列表
        shop: state => state.shop   
      })
    },
    mounted () {   //在点击shop组件，挂在时大请求
      //挂在的时候过去shop
      this.$store.dispatch('getShop',this.id)
      
      //当刷新页面的时候，窗口回被卸载，所以在挂载的时候，
      //回请求新的数据，所以购物车的东西都回清空
       window.addEventListener('unload', () => {
        const {shop:{id}, cartFoods } = this.shop  // 多层解构
        // 将当前商家的购物车数据保存
        saveCartFoods(id, cartFoods)
      })



    },
     components: {
      ShopHeader,
    },
    beforeDestroy () { //在刷新界面时不会执行
      const {shop:{id}, cartFoods } = this.shop  
      saveCartFoods(id,cartFoods)
    },

    
    
   
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/mixins.styl';
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>