// 每个文件名的api对应相应的页面 商家版公用一个文件api
import axios from '@/utils/myaxios'
    
// 微信配置
const getParameter = data => {
  return axios({
    method: 'get',
    url: '/getParameter',
    params: data
  })
}

// 微信授权
const wxUserInfo = data => {
    return axios({
      method: 'get',
      url: '/wxUserInfo',
      params: data
    })
}

// 订单页数据
const findWriteoffOrderByDotUserId = data => {
  return axios({
    method: 'post',
    url: '/findWriteoffOrderByDotUserId',
    data: data
  })
}

// 扫码核销
const useGeneralCoupon = data => {
  return axios({
    method: 'post',
    url: '/useGeneralCoupon',
    data: data
  })
}

export default{
  getParameter,
  wxUserInfo,
  findWriteoffOrderByDotUserId,
  useGeneralCoupon
}