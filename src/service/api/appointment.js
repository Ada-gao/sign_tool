import axios from '../../config/axios'

// 获取可预约列表
export function appointmentList () {
    return axios({
        url: '/v1/appointment/clients/',
        method: 'get'
    })
}

// 提交预约
export function submitAppointment (obj) {
    return axios({
        url: '/v1/appointment/submit/',
        method: 'post',
        data: obj
    })
}

/**
 * 取消预约
 * @param appointmentId
 */
export function cancelAppointment (appointmentId) {
    return axios({
        url: `/v1/appointment/cancel/${appointmentId}`,
        method: 'post'
    })
}

/**
 * 提交打款材料
 * @param appointmentId
 */
export function submitMaterials (appointmentId, obj) {
    return axios({
        url: `/v1/appointment/picture/submit/${appointmentId}`,
        method: 'post',
        data: obj
    })
}

/**
 * 申请退款
 * @param appointmentId
 */
export function requestRefund (appointmentId, obj) {
    return axios({
        url: `/v1/appointment/refund/picture/${appointmentId}/`,
        method: 'post',
        data: obj
    })
}

/**
 * 订单关闭
 * @param appointmentId
 */
export function orderClose (appointmentId, obj) {
    return axios({
        url: `/v1/appointment/cancel_order/${appointmentId}/`,
        method: 'post',
        data: obj
    })
}

/**
 * 邮寄合同
 * @param appointmentId
 */
export function sendEmail (appointmentId, obj) {
    return axios({
        url: `/v1/appointment/contract/express/${appointmentId}/`,
        method: 'post',
        data: obj
    })
}

/**
 * 获取当前理财师预约、打款、合同列表列表
 */
export function getList () {
    return axios({
        url: '/v1/appointment/appointments/',
        method: 'get'
    })
}

/**
 * 根据不同预约id 获取不同预约状态下的详情
 * @param appointmentId
 */
export function statusDetail (appointmentId) {
    return axios({
        url: `/v1/appointment/appointments/${appointmentId}/`,
        method: 'get'
    })
}
