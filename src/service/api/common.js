/**
 * Created by liulong on 2018/5/17.
 */
import axios from '../../config/axios'

export function searchDictionary() {
  return axios({
    url: '/v1/common/dicts/',
    method: 'get'
  })
}
