// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 个人中心
const getOfficialDotByDotCode = data => {
  return axios({
    method: 'post',
    url: '/getOfficialDotByDotCode',
    data
  })
}

export default {
    getOfficialDotByDotCode,
}