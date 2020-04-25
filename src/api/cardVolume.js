// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
  
const findGeneralCouponByUserId = data => {
  return axios({
    method: 'post',
    url: '/findGeneralCouponByUserId',
    data
  })
}

export default {
    findGeneralCouponByUserId
}