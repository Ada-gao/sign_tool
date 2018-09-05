/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */

let baseUrl = ''
let activityUrl = ''
let routerMode = 'hash'
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://10.9.60.141:5000/api/'
    imgBaseUrl = 'http://10.9.60.141:5000/api/'
  activityUrl = 'http://10.9.70.232:9999/activity'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://10.9.60.141:5000/api/'
    imgBaseUrl = 'http://10.9.60.141:5000/api/'
  activityUrl = 'http://10.9.70.232:9999/activity'
}

export { baseUrl, routerMode, imgBaseUrl, activityUrl }
