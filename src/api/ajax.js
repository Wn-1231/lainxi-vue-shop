import axios from 'axios'
import qs from "qs";
import store from "../vuex/store";
import router from "../router/index";
import {
  Indicator,
  Toast,
  MessageBox
} from 'mint-ui'
/* 
对axio进行2次封装一个能发ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

const instance = axios.create({
  timeout: '20000',
  // baseURL: 'http://localhost:4000', // 出跨域请求问题
  baseURL: '/api' // 让代理服务器转发请求4000
})
//请求拦截
instance.interceptors.request.use((config) => {

  // 请求loading
  Indicator.open()
  //3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)//
  const data = config.data

  if (data instanceof Object) { //
    config.data = qs.stringify(data)
  }
  let token = localStorage.getItem('token_key')
  // let token = store.state.user.token
  console.log(token);

  if (token) { //有token 头待token去请求
    config.headers['Authorization'] = token

  } else { //没有token时，因为有初始发请求，所以要组织发请求
     // 如果当前接口需要token校验, 但没有token, 不发请求, 进入错误流程
     const needCheck = config.headers.needCheck
     // 如果没有token, 但又需要token校验, 不能发请求
    if (needCheck) {
      throw new Error('请重新登陆查看首页') //会向下传递错误，传到响应拦截器  
      //对请求拦截的错误在响应拦截，同意响应错误
    }
  }
  return config
})

//响应拦截                 
instance.interceptors.response.use(
  (response) => {
    //关闭请求loging..
    Indicator.close()
    
    //2. 异步请求成功的数据不是response, 而是response.data
    return response.data
  },
  (error) => {
     
    let response = error.response
    //获取当前页面路径
    const path = router.currentRoute.path
    if (!response) { //不发请求错误
     
      //跳转到登陆界面
      if (path !== '/login') {
        router.replace('/login')
        Toast(error.message)
      }
      Indicator.close()
    } else {  //请去错误                     3种  401   404  
      if (error.response.status===401) {  
        //token 过期，后台返回401
        if (path !== '/login') {
          router.replace('/login')
          //注销用户
          store.dispatch('logout')
          Toast(error.response.data.message || '身份过期，重新登录')
        }
      }else if (error.response.status===404) {
        //终端请求404
        MessageBox('提示', '访问的资源不存在')  
      }else{  //一般请求错误
        MessageBox('提示', '请求出错: ' + error.message)
      }
    }
    //返回失败的promise，中断链
    return new Promise(() => {})
  })

export default instance

//总结： 不管是请求错误，还是自己请求拦截器抛出的错误，都会在响应拦截器error.response.status 过去状态码