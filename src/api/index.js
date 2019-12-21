

import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`) 

// 2. 获取食品分类列表
export const  reqCategorys = () => ajax('/index_category',{
  headers: {
    needCheck: true
  }
})

// 3. 根据经纬度获取商铺列表
export const reqShops = ({longitude, latitude}) => ajax('/shops', {
  params: {longitude, latitude},
  headers: {  //自定义需进行检查的请求
    needCheck: true
  }
})

//4.获取短信验证码
export const reqSendCode = (phone) => ajax.get('/sendcode', {
  params: {
    phone
  },
  
})

//5.获取验证码图片
export const reqCaptcha = () => ajax('/captcha'+ Date.now, )

// 6.用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax.post('/login_pwd', {name, pwd, captcha})

// 7. 手机号验证码登陆
export const reqSmsLogin = ({phone, code}) => ajax.post('/login_sms', {phone, code})

//8。自动登录
export const reqAutoLogin = () => ajax.get('/auto_login')

// 获取goods
export const reqGoods = () => ajax('/goods')
// 获取ratings
export const reqRatings = () => ajax('/ratings')
// 获取info
export const reqInfo = () => ajax('/info')
//获取shop坪信息
export const reqShop = (id) => ajax('/shop/'+id )