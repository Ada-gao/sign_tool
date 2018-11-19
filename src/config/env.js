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
let appVersionUrl = ''

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://10.9.61.7:5000/api/'
    imgBaseUrl = 'http://10.9.61.7:5000/api/'
    appVersionUrl = 'http://10.9.61.7:9999/admin/'
    activityUrl = 'http://203.156.231.251:9999/activity/'
    // activityUrl = 'http://10.9.70.231:9999/activity/'
    // activityUrl = 'http://10.9.70.235:9999/activity/'
    // baseUrl = 'http://203.156.231.251:5000/api/'
    // imgBaseUrl = 'http://203.156.231.251:5000/api/'
    // activityUrl = 'http://203.156.231.251:9999/activity/'
} else if (process.env.NODE_ENV === 'production') {
    // test
    // baseUrl = 'http://10.9.61.7:5000/api/'
    // imgBaseUrl = 'http://10.9.61.7:5000/api/'
    // appVersionUrl = 'http://10.9.61.7:9999/admin/'
    // activityUrl = 'http://203.156.231.251:9999/activity/'

    // Staging
    // baseUrl = 'http://47.94.3.138:9999/starmap/api/'
    // imgBaseUrl = 'http://47.94.3.138:9999/starmap/api/'
    // appVersionUrl = 'http://47.94.3.138:9999/admin/'
    // activityUrl = 'http://47.94.3.138:9999/activity/'

    // UAT
    // baseUrl = 'https://crm-uat.suxianginvestment.com/starmap/api/'
    // imgBaseUrl = 'https://crm-uat.suxianginvestment.com/starmap/api/'
    // activityUrl = 'https://crm-uat.suxianginvestment.com/starmap/activity/'

    // SuXiang Product
    baseUrl = 'https://gateway.suxianginvestment.com/starmap/api/'
    imgBaseUrl = 'https://gateway.suxianginvestment.com/starmap/api/'
    appVersionUrl = 'https://gateway.suxianginvestment.com/admin/'
    activityUrl = 'https://gateway.suxianginvestment.com/activity/'
}

export { baseUrl, routerMode, imgBaseUrl, activityUrl, appVersionUrl }

console.log('baseUrl:' + baseUrl)
console.log('activityUrl:' + activityUrl)
console.log('routerMode:' + routerMode)
console.log('imgBaseUrl:' + imgBaseUrl)
console.log('appVersionUrl:' + appVersionUrl)
