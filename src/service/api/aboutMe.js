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
