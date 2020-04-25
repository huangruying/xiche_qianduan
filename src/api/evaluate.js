// 每个文件名的api对应相应的页面
import axios from '@/utils/myaxios'
    
export const getDotNameImage = data => {
  return axios({
    method: 'post',
    url: '/getDotNameImage',
    data
  })
}

export const officialOssUpload = data => {
    return axios({
      method: 'post',
      url: '/officialOssUpload',
      data
    })
  }

export const saveDotEvaluate = data => {
  return axios({
    method: 'post',
    url: '/saveDotEvaluate',
    data
  })
}
