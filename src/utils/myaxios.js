// 1.引入axios
import axios from 'axios'
if(process.env.NODE_ENV==='development'){
  // 开发环境
  axios.defaults.baseURL = 'http://192.168.0.161:8181/yuyuetrip/'
 }else{
   // 生产环境
  axios.defaults.baseURL = ''
}
// 2.设置基准路径
// axios.defaults.baseURL = 'http://a.insoonto.net'
// localStorage.setItem('heima_39_baseurl', 'http://127.0.0.1:3000')

// 3.添加请求拦截器
// 只要使用这个封装的axios发送请求就会经过它的拦截器
// config:就是传说中的请求报文
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 获取token
//   let token = localStorage.getItem('heima_39_Authorization')
//   // 如果有token，则通过请求头的方式进行传递
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 4.添加响应拦截器
// // response:响应报文
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   // console.log(response)
//   let msg = response.data.message
//   if (msg === '用户信息验证失败!' || msg === '用户信息验证失败') {
//     // 说明token没有，则应该重新登陆
//     window.location = '#/login'
//   }
//   return response
// //   return response.data ? response.data : response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })
// 5.暴露
export default axios
