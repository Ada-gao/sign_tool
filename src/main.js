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
import { DatetimePicker,
         Checklist,
         Spinner,
         Search,
         Button,
         Navbar,
         TabItem,
         TabContainer,
         TabContainerItem,
         Popup,
         Picker,
         Cell,
         Field
       } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(LoadingPlugin)

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

// window.setInterval(() => {
//   if (!navigator.onLine) {
//     console.log('no')
//     router.push({name: 'NoInternet'})
//   } else {
//     console.log('yyy')
//   }
// }, 2000)

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
Vue.component(Search.name, Search)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
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
