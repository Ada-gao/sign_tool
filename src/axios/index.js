import axios from 'axios'
import qs from 'qs'
import * as types from 'common/js/types'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://10.60.2.141:5000/api/v1'

// http request 拦截器
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(res => {
  if (!res.data.success) {
    return Promise.reject(res)
  }
  return res
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        store.commit( types.LOGOUT)
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.fullPath }
        })
    }
  }
  return Promise.reject(error.response.data)
})

export default axios

// export function fetch(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//       .then(response => {
//         resolve(response.data)
//       }, err => {
//         reject(err)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }