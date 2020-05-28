// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 我的卡包
const finYyProductCardByUid = data => {
  return axios({
    method: 'post',
    url: '/finYyProductCardByUid',
    data
  })
}

export default{
    finYyProductCardByUid,
}