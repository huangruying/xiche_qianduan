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
