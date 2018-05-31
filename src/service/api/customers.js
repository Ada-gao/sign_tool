import axios from '../../config/axios'
// import { getStore } from '../config/mUtils'

/**
 * 查看客户列表
 */
export function checkCusomersList () {
    return axios({
        url: '/v1/client/customers/',
        method: 'get'
    })
}

/**
 * 新增客户
 */
export function addCusomer (obj) {
    return axios({
        url: '/v1/client/customers/',
        method: 'post',
        data: obj
    })
}

/**
 * 搜索客户
 */
export function searchCustomer (q) {
    return axios({
        url: '/v1/client/customers/',
        method: 'get',
        params: {
            q
        }
    })
}

/**
 * 查看客户详情
 */
export function checkCusomersDetail (clientId) {
    return axios({
        url: `/v1/client/customers/${clientId}`,
        method: 'get'
    })
}

/**
 * 查看所有客户备注以及信息过滤
 */
export function checkCustomerRemarks () {
  return axios({
    url: '/v1/client/customers/remarks/',
    method: 'get'
  })
}

/**
 * 新增客户备注
 */
export function addCustomerRemarks (clientId, obj) {
  return axios({
    url: `/v1/client/customers/${clientId}/remarks/`,
    method: 'post',
    data: obj
  })
}

/**
 * 查看指定客户购买的产品
 */
export function checkSpecifiedPro (clientId) {
  return axios({
    url: `/v1/client/customers/${clientId}/products/`,
    method: 'get'
  })
}

/**
 * 新增银行卡信息
 */
export function addBandkDetail (clientCertificationId, obj) {
  return axios({
    url: `/v1/client/customers/${clientCertificationId}/bankcards/`,
    method: 'post',
    data: obj
  })
}

/**
 * 查看银行信息
 */
export function checkBankDetail () {
  return axios({
    url: '/v1/client/customers/banks/',
    method: 'get'
  })
}

/**
 * 查看客户银行卡信息
 */
export function checkCustomerBankDetail (clientId) {
  return axios({
    url: `/v1/client/customers/${clientId}/bankcards/`,
    method: 'get'
  })
}

/**
 * 更新银行卡正面照
 */
export function updateFrontPic (clientCertificationId, obj) {
  return axios({
    url: `/v1/client/customers/${clientCertificationId}/bankcards/front/`,
    method: 'put',
    data: obj
  })
}

/**
 * 更新银行卡反面照
 */
export function updateBackPic (clientCertificationId) {
  return axios({
    url: `/v1/client/customers/${clientCertificationId}/bankcards/back/`,
    method: 'put'
  })
}

/**
 * 查看客户证件信息
 * @param clientId
 */
export function checkCustomerCertificate (clientId) {
  return axios({
    url: `/v1/client/customers/${clientId}/identity/`
  })
}

/**
 * 潜客完善信息上传文件
 * @param clientId
 * @param obj
 * @returns {AxiosPromise}
 */
export function uploadFile (clientId, obj) {
  return axios({
    url: `/v1/client/customers/complete_info/${clientId}`,
    method: 'post',
    data: obj
  })
}

export function perfectInfos (obj) {
  return axios({
    url: '/v1/client/customers/certification/',
    method: 'post',
    data: obj
  })
}
