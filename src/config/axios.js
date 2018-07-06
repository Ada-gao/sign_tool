import { baseUrl } from './env'
import axios from 'axios'
import store from '@/service/store/store'
import * as types from '@/service/store/types'
import router from '../router'
import { getStore } from '@/config/mUtils'
import { MessageBox } from 'mint-ui'

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
            console.log('正常')
        } else {
            console.log('断网')
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
    response => response
        // const res = response.data
        // if (res.code !== 20000) {
        //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         console.log('服务器端')
        //     }
        //     return Promise.reject(res)
        // } else {
        //     return response.data
        // }
    ,
    error => {
        if (error && error.response) {
          const res = error.response
          // res.data.codeMsg = interceptorsMsg.errMessage(res.config.url, res.data.code)
          console.log(res.data)
            switch (res.status) {
                case 400:
                // error.message = '手机号已被注册'
                  toast(res.data.message)
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
        }
        return Promise.reject(error)
    })
export function toast (text) {
    MessageBox({
        title: ' ',
        message: text,
        position: 'top',
        showConfirmButton: true
        // duration: 2000,
        // className: 'global_toast'
    })
}
export default axios
