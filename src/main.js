// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
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

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
