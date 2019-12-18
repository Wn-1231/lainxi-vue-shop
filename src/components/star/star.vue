<template>
  <div class="star star-24" >
    <span class="star-item" :class='Score' v-for="(Score,index) in  getScores" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      size:Number,  //尺寸   例如 ：3.5
      score:Number //评分
    },
    computed:{   
      getScores(){
        let score = this.score
        let arr = []

        //向下取整 ----3.5  ----3 添加on类
        let scoreInteger = Math.floor(score)
        for (let i = 0; i < scoreInteger; i++) {
          arr.push('on')
        }

        //添加half的类
        let halfNumber = (score - scoreInteger)*10
        if (halfNumber>=5 ) {
          arr.push('half')
        }
        
        //添加off的类
        while (arr.length<5) {
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
 @import '../../common/mixins.styl'
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')
 
</style>
