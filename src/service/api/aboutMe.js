import axios from '../../config/axios'

/**
 * 获取分享图片
 */
export function getShare (obj) {
    return axios({
        url: '/v1/client/share/qrcode/',
        method: 'post',
        data: obj
    })
}
/**
 * 获取消息列表
 */
export function getInfoList () {
    return axios({
        url: '/v1/mine/notification/list/',
        method: 'get'
    })
}
/**
 * 查看消息详情
 * @param notificationId
 */
export function infoDetail (notificationId) {
    return axios({
        url: `/v1/mine/notification/detail/${notificationId}/`,
        method: 'get'
    })
}
