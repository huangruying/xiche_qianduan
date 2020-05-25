// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 愉悦站点
const findOfficialYyStations = data => {
  return axios({
    method: 'post',
    url: '/findOfficialYyStations',
    data
  })
}

export default{
    findOfficialYyStations,
}