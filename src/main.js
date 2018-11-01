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
import { LoadingPlugin, ConfigPlugin } from 'vux'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.use(LoadingPlugin)

Vue.config.debug = true
Vue.config.productionTip = false

Vue.use(VueCordova)
// x-dialog 禁止滑动底部
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
// console.log('----------port:' + window.location.port)
if (window.location.protocol === 'file:' ||
    window.location.port === '8080' ||
    window.location.port === '80' ||
    window.location.port === '') {
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

// 将 axios 挂载到 prototype 上，在组件中可以直接使用 this.$axios 访问
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: {App},
  template: '<App/>'
})
