// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'

// 根据openid查询微信用户信息
const getWeiXinByOpenId = data => {
  return axios({
    method: 'post',
    url: '/getWeiXinByOpenId',
    data
  })
}
// 根据openid查询站点高铁卡
const finHallQrcode = data => {
  return axios({
    method: 'post',
    url: '/finHallQrcode',
    data
  })
}

export default{
  getWeiXinByOpenId,
  finHallQrcode
}