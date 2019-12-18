<template>
  <div class="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowLogin"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from "./components/FootertGuide/FooterGuide";
import {mapState,} from 'vuex'
export default {
  components: {
    FooterGuide
  },
 
  mounted() {
    // 通知action异步获取address并保存到state
    console.log(this);
    this.$store.dispatch("getAddress");
    this.$store.dispatch('autoLogin')
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
