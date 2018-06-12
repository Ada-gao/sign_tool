import { baseUrl } from './env'
import axios from 'axios'
import store from '@/service/store/store'
import * as types from '@/service/store/types'
import router from '../router'
import { getStore } from '@/config/mUtils'

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
            console.log('网。。。。', error, error.response)
            switch (error.response.status) {
                case 400:
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
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error)
    })

export default axios
