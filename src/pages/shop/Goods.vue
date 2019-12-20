<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <li class="menu-item" 
          :class="{current:index === currentIndex}" 
          v-for="(good, index) in goods" :key="good.name" 
          @click="clickItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li  @click="ShowFood(food)" class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                   <CartControl :food=food></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food = food  ref="food"> </Food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from "../../components/CartControl/CartControl";
  import Food from "../../components/Food/Food";
  import ShopCart from "../../components/shopCart/shopCart";
  export default {
    name:'Goods',
    data () {
      return {
        // 1). 右侧列表滑动的Y轴坐标: scrollY  在滑动过程中不断改变
        scrollY: 0,
        // 2). 右侧每个分类<li>的top值的数组tops: 第一次列表显示后统计后面不再变化
        tops: [],

        //因为点击只能显示一次，所以把每次的状态保存一下在显示
        food:{}
      }
    },
    components:{
      CartControl,
      Food,
      ShopCart
    },
    computed:{
      ...mapState({
        goods:(state)=>state.shop.goods 
      }),
    
       currentIndex(){  //通过计算属性通过当前的位置计算对应的下标
        let index = this.tops.findIndex((top,index )=> this.scrollY >=top && this.scrollY<this.tops[index+1])
      //  this.index  = index    写在这，每次判断都是相等
        if (this.index !== index && this.leftScroll ) {  
          this.index  = index  //每次滑动读取时候，把的当前的index存一下
          console.log(1);
          let li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)  
        }
        return index
       } 


    },
    methods:{
      //点击保存对应的Food数据用于读取
      ShowFood(food){
        this.$refs.food.toggleShow()
        this.food = food
      },

      //newscroll
      initScroll () {
        this.leftScroll = new BScroll(this.$refs.left, {
          click: true

        })
        this.rightScroll = new BScroll(this.$refs.right, {
            probeType: 1, 
            click: true,
          })

        //给滑动榜监听，过去滑动结束的位置
        this.rightScroll.on('scrollEnd',(y,x)=>{
          let Y =y.y
          this.scrollY = Math.abs(Y)
        })

        //给滑动榜监听，实时过去滑动的位置
         this.rightScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })   
      }, 
      
      //点击左侧导航切换右列表
      clickItem(index){
        const top =this.tops[index]
        this.scrollY = top
        //通过库方法跳到指定的位置
        this.rightScroll.scrollTo(0,-top,200)
      },


      //初始化加工数组
      initTops(){  
        let arr = []
        let top = 0  //初始的第一个位置是0
        arr.push(top)

        let lis = this.$refs.rightUl.children   //过去所有分类列表没个大li 的宽
        lis.forEach((li) => {
          top += li.clientHeight
          arr.push(top)
        });

        this.tops = arr 
        console.log(arr);
      }
    },
    
    watch:{//监视属性goods的变化
      goods(){    
        this.$nextTick(()=>{  //这个方法是数据更新以后调用
          this.initScroll()
          this.initTops()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 auto
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
