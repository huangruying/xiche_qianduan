// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 个人中心
const getGeneralCouponByCode = data => {
  return axios({
    method: 'post',
    url: '/getGeneralCouponByCode',
    data
  })
}

export default{
  getGeneralCouponByCode,
}