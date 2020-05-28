// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
//  公众号购买记录
const findProductOrderInfos = data => {
  return axios({
    method: 'post',
    url: '/findProductOrderInfos',
    data
  })
}

export default{
    findProductOrderInfos,
}