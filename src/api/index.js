// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 首页
const indexInfo = data => {
  return axios({
    method: 'post',
    url: '/findOfficialDotInfos',
    data
  })
}

const findCarwashTypeInfos = data => {
  return axios({
    method: 'post',
    url: '/findCarwashTypeInfos',
    data
  })
}

// 微信配置
const getParameter = data => {
  return axios({
    method: 'get',
    url: '/getParameter',
    params: data
  })
}

export default{
  indexInfo,
  findCarwashTypeInfos,
  getParameter
}