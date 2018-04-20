// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from 'common/js/store'
import 'common/style/index.less'
import 'lib-flexible'
import * as filters from 'common/js/filter.js'
import { LoadingPlugin } from 'vux'

Vue.use(LoadingPlugin)

Vue.config.productionTip = false

Vue.directive('focus', {
	inserted: function (el) {
		el.focus()
	}
})

// filter 挂到vue
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// 将 axios 挂载到 prototype 上，在组件中可以直接使用 this.axios 访问
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})
