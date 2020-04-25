// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 个人中心
const saveVehicleUserId = data => {
  return axios({
    method: 'post',
    url: '/saveVehicleUserId',
    data
  })
}

export default{
  saveVehicleUserId,
}