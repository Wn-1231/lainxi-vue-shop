

  /* 切换商家时, 购物车数据会丢失
    原因: 在切换商家获取商家数据时, 会清除前面商家的所有数据(商家和购物车)
    解决: 对购物车数据进行sessionStorage的存取操作
    保存什么数据?
        保存的是购物车中food的数量count
        结构: shopId_key: {foodId1: count2, foodId2: count2}
    什么时候保存?
        在Shop组件卸载前beforeDestroy()中保存, 根据shop的id和cartFoods生成要保存数据
    什么时候读取?
        在请求获取到新的shop后读取sessionStorage中保存的cartCounts, 生成一个cartFoods的数组
         */
export function saveCartFoods(id,CartFoods) {
  console.log(id,CartFoods);
  let shopId_key =  `shop${id}_key`
  let CartFoodObj 
  if (CartFoods.length>0) {
     CartFoodObj = CartFoods.reduce((pre,food)=>{
      pre[food.id] = food.count
      return pre
    },{})
    window.sessionStorage.setItem(shopId_key,JSON.stringify(CartFoodObj))
  }
}

import Vue from "vue";
export function getCartFoods(shop) {
  const cartFoods = []
  let shopId_key =  `shop${shop.id}_key`
  let CartFoodObj  = JSON.parse(sessionStorage.getItem(shopId_key)) || {}
  

  shop.goods.forEach((good) => {
    good.foods.forEach((food)=>{ 
      //这是拿到每一个food的id去查找。如果在seesion读取到对应的id，
      //那就给新的获取的shop中的food添加上对应的count
      const count = CartFoodObj[food.id]   
      if (count>0) {
        Vue.set(food,'count',count)
        cartFoods.push(food)
      }
    })
  });

  return cartFoods   //返回每个shop的对应的购物车列表
  
}

