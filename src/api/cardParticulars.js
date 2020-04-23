// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 个人中心
const createBarCode = data => {
  return axios({
    method: 'get',
    url: 'wash/createBarCode',
    data
  })
}

export default{
    createBarCode,
}