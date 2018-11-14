import axios from '../../config/axios'

/**
 * 获取理财师tag
 */
export function getTags () {
    return axios({
        url: '/v1/mine/user/tags/',
        method: 'get'
    })
}

/**
 * 获取消息列表
 */
export function getNotfList () {
    return axios({
        url: '/v1/mine/notification/list/',
        method: 'get'
    })
}
