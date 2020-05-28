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

// 微信公众号支付
const wxOfficialPay = data => {
  return axios({
    method: 'get',
    url: '/wxOfficialPay',
    params:data
  })
}

// 定时请求获取订单是否支付
const getStatusByOrderNo = data => {
  return axios({
    method: 'post',
    url: '/getStatusByOrderNo',
    data: data
  })
}

export default{
    findYyCouponscodeInfos,
    receiveYyCouponscodeByBarcode,
    wxOfficialPay,
    getStatusByOrderNo
}