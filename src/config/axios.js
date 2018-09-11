import { baseUrl } from './env'
import axios from 'axios'
import store from '@/service/store/store'
import * as types from '@/service/store/types'
import router from '../router'
import { getStore } from '@/config/mUtils'
import { toast } from '@/common/js/filter'
// import interceptorsMsg from '@/service/api/interceptor'

// axios 配置
axios.defaults.timeout = 30000
axios.defaults.baseURL = baseUrl
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

// http request 拦截器
axios.interceptors.request.use(
    config => {
        let XToken = getStore('token')
        if (XToken) {
            config.headers['X-Token'] = XToken
        }
        if (navigator.onLine) {
            // console.log('正常')
        } else {
            // console.log('断网')
            router.replace({name: 'NoInternet'})
        }
        return config
    },
    err => {
        console.log('dfghjdk', err)
        return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => response,
    error => {
      console.log(error)
      const res = error.response
      // res.data.codeMsg = interceptorsMsg.errMessage(res.config.url, res.data.code)
      // console.log(res.data.codeMsg)
      switch (res.status) {
        case 500:
          if (res.data.body.error.indexOf('身份证') !== -1) {
            toast('请输入正确的证件号码')
          }
          error.message = '参数错误'
          break
        case 400:
          // error.message = '手机号已被注册'
          if (window.location.href.indexOf('login') !== -1) {
            return
          }
          res.data.message ? toast(res.data.message) : toast(res.data.msg)
          error.message = '请求错误'
          break
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
          error.message = '未授权，请登陆'
          break
      }
      if (res.data.body.code === 'ERROR_ARGUMENTS_INVALID') {
        if (res.data.body.error.indexOf('银行卡') > -1) {
          toast('请输入正确的银行卡号')
        }
      }
      return Promise.reject(error)
    }
)
export default axios
