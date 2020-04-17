// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 列表
export const stationList = data => {
  return axios({
    method: 'post',
    url: 'station/listStationsNameInfos2',
    data
  })
}

// 国际机场
export const findYyInternational = data => {
  return axios({
    method: 'post',
    url: 'station/findYyInternational',
    data
  })
}

// 站点大厅
export const findStationsByIds2 = data => {
  return axios({
    method: 'post',
    url: 'station/findStationsByIds2',
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