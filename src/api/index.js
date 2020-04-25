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

export default{
  indexInfo,
  findCarwashTypeInfos
}