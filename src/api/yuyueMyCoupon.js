// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 我的优惠劵
const findYyCouponscodeInfos = data => {
  return axios({
    method: 'post',
    url: '/findYyCouponscodeInfos',
    data
  })
}

// 领取优惠劵
const receiveYyCouponscodeByBarcode = data => {
    return axios({
      method: 'post',
      url: '/receiveYyCouponscodeByBarcode',
      data
    })
  }

export default{
    findYyCouponscodeInfos,
    receiveYyCouponscodeByBarcode
}