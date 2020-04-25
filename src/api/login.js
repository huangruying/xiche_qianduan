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