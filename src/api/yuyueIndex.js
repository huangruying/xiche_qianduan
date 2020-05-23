// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 愉悦首页
const saveVehicleUserId = data => {
  return axios({
    method: 'post',
    url: '/saveVehicleUser',
    data
  })
}

export default{
  saveVehicleUserId,
}