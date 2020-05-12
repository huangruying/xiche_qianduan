// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 个人中心
const getWriteoffOrderBycouponCode = data => {
  return axios({
    method: 'post',
    url: '/getWriteoffOrderBycouponCode',
    data
  })
}

export default{
    getWriteoffOrderBycouponCode,
}