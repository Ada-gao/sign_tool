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
        if (config.url.indexOf('auth_token') !== -1) {
          // SuXiang Product
          let appId = 'b2c9d0f4eb4848d0b385b7a35f636b9c'
          let appSecret = '930b41c9646c461b827c359bf8a23837'
          if (baseUrl.includes('10.9.61.7')) {
            // dev
            appId = 'b2c9d0f4eb4848d0b385b7a35f636b9c'
            appSecret = '930b41c9646c461b827c359bf8a23837'
          } else if (baseUrl.includes('10.9.61.3')) {
            // Test
            appId = '2d061a9a30f94b93ab869632840362a7'
            appSecret = '5cd44362d34e4b91b6db3080c258bae4'
          } else if (baseUrl.includes('47.94.248.24')) {
            // Staging
            appId = 'e72e439f2c79455bac3a9c7eef517b6c'
            appSecret = 'e8473ceace6344a8b9f3ae4a32d09820'
          }
          config.headers['AppID'] = appId
          config.headers['AppSecret'] = appSecret
        }
        return config
    },
    err => {
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
          if (res.statusText === 'BAD REQUEST') {
            console.log('return login..........')
            store.commit(types.LOGOUT)
            router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
            })
          }
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
