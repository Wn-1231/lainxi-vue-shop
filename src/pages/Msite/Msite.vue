<template>
  <section class="msite">
    <Header :title="this.address.name || '加载中.....'">
      <span class="header_login" slot="left">
        <span class="header_login_text">登录|注册</span>
      </span>
      <span class="header_search" slot="right">
        <i class="iconfont icon-sousuo"></i>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav" v-if="categorys.length >0" >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cats,index) in getCategorys" :key="index">
            <div class="link_to_food" v-for="(cat,index) in cats " :key="cats.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + cat.image_url" />
              </div>
              <span>{{cat.title}}</span>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <nav class="msite_nav" v-else>
      <img src="./msite_back.svg" alt="ww">
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list" >
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list" v-if="shops.length>0">
          <li class="shop_li border-1px" v-for="(p,index) in shops" :key="p.id" @click="$router.push('/shop')">
            <a>
              <div class="shop_left">
                <img class="shop_img" :src="'https://fuss10.elemecdn.com' + p.image_path" />
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title ellipsis">{{p.name}}</h4>
                  <ul class="shop_detail_ul">
                    <li class="supports">保</li>
                    <li class="supports">准</li>
                    <li class="supports">票</li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <Star :score='p.rating' :size='24'></Star>
                    <div class="rating_section">{{p.rating}}</div>
                    <div class="order_section">月售{{p.id}}单</div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_right">{{p.delivery_mode.text}}</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{p.float_minimum_order_amount}}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费约¥{{p.float_delivery_fee}}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>
        </ul>
        <ul v-else>
          <li>  <img src="./images/shop/shop_back.svg" alt="shopLoging"></li>
          <li>  <img src="./images/shop/shop_back.svg" alt="shopLoging"></li>
          <li>  <img src="./images/shop/shop_back.svg" alt="shopLoging"></li>
          <li>  <img src="./images/shop/shop_back.svg" alt="shopLoging"></li>  
        </ul>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { mapState } from "vuex";
import chunk from "lodash/chunk";

export default {
  name:'Msite',
  computed: {
    ...mapState(["address", "latitude", "categorys", "longitude", "shops"]),
    //计算属性，把categorys 置成二维数组
    getCategorys() {
      /*   let bigArr = [];
      let smallArr = [];
      this.categorys.forEach(item => {
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        smallArr.push(item);

        if (smallArr.length === 8) {
          smallArr = [];
        }
      });
      console.log(bigArr); 
       return bigArr;
      */
      //利用函数库g工具  lodash 库
      return chunk(this.categorys, 8);
    }
  },

  async mounted() {
    this.$store.dispatch("getShops");
    //利用dispath的返回值，成功以才执行await后的代码
    await this.$store.dispatch("getCategorys");
    var mySwiper = new Swiper(".swiper-container", {
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/mixins.styl';

.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc
</style>
