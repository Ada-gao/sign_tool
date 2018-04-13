// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    console.log(store)
    // 对此路由进行验证
    if (store.state.isLogin === 100) {
      next()
    } else {
      // 未登录 query: {Rurl: to.fullPath}
      next({path: '/login', query: { Rurl: to.fullPath }})
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})
