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
 * 获取产品详情
 * @param productId
 */
export function getProductDetail (productId) {
  return axios({
    url: `/v1/product/get_products/${productId}/`,
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
 * 获取投后报告列表
 * @param productId
 */
export function getAnnoucement (productId) {
  return axios({
    url: `/v1/product/${productId}/get_post_investment_reports/`,
    method: 'get'
  })
}

/**
 * 上传客户材料接口
 * @param productId
 */
export function getCustomerMaterials (productId) {
  return axios({
    url: `/v1/product/client/files/${productId}/`,
    method: 'get'
  })
}

/**
 * 向客户邮箱发送产品文件
 * @param obj
 */
export function sendProduct (obj) {
  return axios({
    url: '/v1/product/send/files/',
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
    url: '/v1/product/send/files/',
    method: 'post',
    data: obj
  })
}
