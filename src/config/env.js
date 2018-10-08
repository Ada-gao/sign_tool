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
    // baseUrl = 'http://10.9.60.141:5000/api/'
    // imgBaseUrl = 'http://10.9.60.141:5000/api/'
    activityUrl = 'http://203.156.231.251:9999/activity/'
    // activityUrl = 'http://10.9.70.235:9999/activity/'
    baseUrl = 'http://203.156.231.251:5000/api/'
    imgBaseUrl = 'http://203.156.231.251:5000/api/'
    // activityUrl = 'http://203.156.231.251:9999/activity/'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://10.9.60.141:5000/api/'
    imgBaseUrl = 'http://10.9.60.141:5000/api/'
    activityUrl = 'http://10.9.70.231:9999/activity/'
    // baseUrl = 'http://203.156.231.251:5000/api/'
    // imgBaseUrl = 'http://203.156.231.251:5000/api/'
    // activityUrl = 'http://203.156.231.251:9999/activity/'
}

console.log('baseUrl:' + baseUrl)
console.log('activityUrl:' + activityUrl)
console.log('routerMode:' + routerMode)
console.log('imgBaseUrl:' + imgBaseUrl)
