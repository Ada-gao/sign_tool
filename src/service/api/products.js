import axios from '@/config/axios'

/**
 * 获取产品列表
 */
export function getProducts () {
  return axios({
    url: '/v1/crm/product/getProducts/',
    methods: 'get'
  })
}
