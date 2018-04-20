import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

// let state = {
//   isLogin: 0
// }

// const mutations = {
//   changeLogin (state, data) {
//     state.isLogin = data
//   }
// }

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    isLogin: 0
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    }
  }
})
