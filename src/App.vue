<template>
  <div class="App">
    <div class="header">
      <router-view></router-view>
    </div>
    <ul class="footer">
     <router-link to='/msite'><li>首页</li></router-link>
     <router-link to='/Search'><li>搜索</li></router-link>
     <router-link to='/order'><li>订单</li></router-link>
     <router-link to='/profile'><li>我的</li></router-link>
     <!-- <router-link :to='{li.path}' v-for="(li,index) router" :key="li.id"><li>{{li.title}}</li></router-link> -->
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
       router:[
      {id:1,path:'/msite',title:'首页'},
      {id:2,path:'/Search',title:'搜索'},
      {id:3,path:'/order',title:'订单'},
      {id:4,path:'/profile',title:'我的'}
    ]
    };
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

.App
  width 100%
  height 100%
  .header
    width 100%
    height 90%
    background-color #F5F5F5
  .footer
    width 100%
    height 10%
    display flex
    font-size 35px
    justify-content space-around
    align-items center
    li
      width  80px
      height 100px
      color black 
      text-align center
      line-height 100px
      &.active
        background-color #04A875


</style>
