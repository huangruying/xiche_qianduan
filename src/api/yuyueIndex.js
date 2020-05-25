// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
// 愉悦首页
const findOfficialYyProduct = data => {
  return axios({
    method: 'post',
    url: '/findOfficialYyProduct',
    data
  })
}

export default{
  findOfficialYyProduct,
}