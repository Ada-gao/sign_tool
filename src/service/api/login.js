import axios from '../../config/axios'
/**
 * 获取用户验证码
 */
export function getVerificationCode (obj) {
    return axios({
        url: '/v1/auth/verification_code/',
        method: 'post',
        data: obj
    })
}
/**
 * 获取用户 token
 */
export function getAuthToken (obj) {
    return axios({
        url: '/v1/auth/auth_token/',
        method: 'post',
        data: obj
    })
}
/**
 * 获取用户 token
 */
export function getTags () {
    return axios({
        url: '/v1/mine/user/tags/',
        method: 'get'
    })
}
