import axios from '@/config/axios'

/**
 * 获取产品列表
 */
export function getProducts () {
  return axios({
    url: '/v1/product/get_products/',
    methods: 'get'
  })
}

/**
 * 获取产品交易文件列表
 * @param productId
 */
export function getTransaction (productId) {
  return axios({
    url: `/v1/product/${productId}/get_product_transaction_files/`,
    method: 'get'
  })
}

/**
 * 获取产品文件列表
 * @param productId
 */
export function getProductFiles (productId) {
  return axios({
    url: `/v1/product/${productId}/get_product_files/`,
    method: 'get'
  })
}

/**
 * 获取产品公告列表
 * @param productId
 */
export function getAnnoucement (productId) {
  return axios({
    url: `/v1/product/${productId}/get_product_annoucement_files/`,
    method: 'get'
  })
}

/**
 * 向客户邮箱发送产品文件
 * @param obj
 */
export function sendProduct (obj) {
  return axios({
    url: '/v1/product/send/product_files/',
    method: 'post',
    data: obj
  })
}

/**
 * 向客户邮箱发送交易文件
 * @param obj
 */
export function sendTrade (obj) {
  return axios({
    url: '/v1/product/send/trade_files/',
    method: 'post',
    data: obj
  })
}
