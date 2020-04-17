// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 首页
export const index = data => {
  return axios({
    method: 'post',
    url: 'station/findYyProductOfficial',
    data
  })
}

// 首页-商品详情
export const getQuery = data => {
    return axios({
      method: 'post',
      url: 'station/getYyProductOfficialById',
      data
    })
}

// export const index = data => {
//   return axios({
//     method: 'get',
//     url: 'station/getYyProductOfficialById',
//     params: data
//   })
// }