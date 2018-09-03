import axios from '../../config/axios'
const baseUrl = 'http://10.9.70.232:9999'

/**
 * 获取已报名列表
 * @param activityId
 * @returns {AxiosPromise}
 */
export function getSignedClientList (activityId) {
  return axios({
    url: baseUrl + '/activity/financial/activityClient?activityId=' + activityId,
    method: 'get'
  })
}

/**
 * 查询活动详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getActivityDet (id) {
  return axios({
    url: baseUrl + '/activity/financial/activity/' + id,
    method: 'get'
  })
}

/**
 * 理财师可见活动列表
 * @returns {AxiosPromise}
 */
export function getActivityList () {
  return axios({
    url: baseUrl + '/activity/financial/activity',
    method: 'get'
  })
}

export function signActivity (data) {
  return axios({
    url: baseUrl + '/activity/financial/activityClient',
    data,
    method: 'post'
  })
}
