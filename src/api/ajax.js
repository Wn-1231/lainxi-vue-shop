import axios from 'axios'
import qs from "qs";
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
  baseURL:'/api' // 让代理服务器转发请求4000
})

instance.interceptors.request.use((config) => {
  //3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)//
  let data = config.data
  if (data instanceof Object ) {
    config.data = qs.stringify(config)
  }
   
  return config
})
instance.interceptors.response.use(
  (response) => {

    //2. 异步请求成功的数据不是response, 而是response.data
    return response.data
  },
  (error) => {
    alert(error.message)
    //返回失败的promise，中断链
    return new Promise(() => {})
  })

export default instance