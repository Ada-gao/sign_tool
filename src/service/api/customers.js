import axios from '../../config/axios'
// import { getStore } from '../config/mUtils'

/**
 * 查看客户列表
 */
export function checkCusomersList () {
    return axios({
        url: '/v1/crm/customers/',
        method: 'get'
    })
}

/**
 * 新增客户
 */
export function addCusomer (obj) {
    return axios({
        url: '/v1/crm/customers/',
        method: 'post',
        data: obj
    })
}

/**
 * 搜索客户
 */
export function searchCustomer (q) {
    return axios({
        url: '/v1/crm/searchCustomers/',
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
        url: `/v1/crm/customers/${clientId}`,
        method: 'get'
    })
}
