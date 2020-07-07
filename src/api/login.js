// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 登录
export const userLogin = data => {
  return axios({
    method: 'post',
    url: 'user/userLogin',
    data
  })
}

//  短信验证码
export const sendMsg = data => {
  return axios({
    method: 'post',
    url: '/sendMsg',
    data
  })
}

//  普通用户登录或注册
export const signUpOrLogIn = data => {
  return axios({
    method: 'post',
    url: '/signUpOrLogIn',
    data
  })
}

//  商家登录
export const businessUpOrLogIn = data => {
  return axios({
    method: 'post',
    url: '/businessUpOrLogIn',
    data
  })
}

//  查询所属机构
export const findMechanismName = data => {
  return axios({
    method: 'post',
    url: '/findMechanismName',
    data
  })
}

//  新增注册网点
export const saveDot = data => {
  return axios({
    method: 'post',
    url: '/saveDot',
    data
  })
}

//  根据openid修改手机号
export const updateWeixinUserByOpenId = data => {
  return axios({
    method: 'post',
    url: '/updateWeixinUserByOpenId',
    data
  })
}

//  yuyue个人中心修改资料
export const updateWeixinUserByPhone = data => {
  return axios({
    method: 'post',
    url: '/updateWeixinUserByPhone',
    data
  })
}

// 洗车网点服务项
export function findCarwashTypesInfos(data) {
  return axios({
    url: '/findCarwashTypesInfos',
    method: 'post',
    data
  })
}