/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */

let baseUrl = ''
let routerMode = 'hash'
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
    // debugger
    baseUrl = 'http://10.9.60.141:5000/api/'
    imgBaseUrl = 'http://10.9.60.141:5000/api/'
    // baseUrl = 'http://106.14.115.164:5000/api/'
    // imgBaseUrl = 'http://106.14.115.164:5000/api/'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://10.9.60.141:5000/api/'
    imgBaseUrl = 'http://10.9.60.141:5000/api/'
    // baseUrl = 'http://106.14.115.164:5000/api/'
    // imgBaseUrl = 'http://106.14.115.164:5000/api/'
}

// if (process.env.NODE_ENV === 'development') {
//     // debugger
//     baseUrl = 'http://nothsun.top:5000/api/'
//     imgBaseUrl = 'http://nothsun.top:5000/api/'
// } else if (process.env.NODE_ENV === 'production') {
//     baseUrl = 'http://nothsun.top:5000/api/'
//     imgBaseUrl = 'http://nothsun.top:5000/api/'
// }

// http://nothsun.top:5000

export { baseUrl, routerMode, imgBaseUrl }
