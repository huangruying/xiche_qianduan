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

// 扫码核销券码信息查询
const getDotsTypeInfo = data => {
  return axios({
    method: 'post',
    url: '/getDotsTypeInfo',
    data: data
  })
}

// 测试
const weChatUnifiedorder = data => {
  return axios({
    method: 'get',
    url: '/weChatUnifiedorder',
    params: data
  })
}

// 支付测试 获取openId
const getOpenId = data => {
  return axios({
    method: 'get',
    url: '/getOpenId',
    params: data
  })
}

// 支付测试 返回页面需要的参数进行微信公众号支付
const wxOfficialPay = data => {
  return axios({
    method: 'get',
    url: '/wxOfficialPay',
    params: data
  })
}

// 第3方支付
const buyBearercardjsapi = data => {
  return axios({
    method: 'get',
    url: '/buyBearercardjsapi',
    params: data
  })
}

// 第3方支付信息
const getYyIproductById = data => {
  return axios({
    method: 'get',
    url: '/getYyIproductById',
    params: data
  })
}

export default{
  getParameter,
  wxUserInfo,
  findWriteoffOrderByDotUserId,
  useGeneralCoupon,
  getDotsTypeInfo,
  weChatUnifiedorder,
  wxOfficialPay,
  getOpenId,
  buyBearercardjsapi,
  getYyIproductById
}