// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import VueCordova from './vue-cordova/index'
import store from 'common/js/store'
import 'common/style/index.less'
import 'lib-flexible'
import * as filters from 'common/js/filter.js'
import { LoadingPlugin } from 'vux'
import { DatetimePicker, Checklist, Spinner } from 'mint-ui'
import 'mint-ui/lib/style.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(LoadingPlugin)

// Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueCordova)
console.log('----------port:' + window.location.port)
if (window.location.protocol === 'file:' || window.location.port === '8080' || window.location.port === '80' || window.location.port === '') {
  console.log('attach cordova.js')
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

Vue.directive('focus', {
	inserted: function (el) {
		el.focus()
	}
})

// filter 挂到vue
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// 以组件形式调用(有bug)
// import { DatetimePlugin } from 'vux'
// Vue.use(DatetimePlugin)

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Checklist.name, Checklist)
Vue.component(Spinner.name, Spinner)

// 将 axios 挂载到 prototype 上，在组件中可以直接使用 this.$axios 访问
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})
