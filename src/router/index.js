import Vue from 'vue'
import store from 'common/js/store.js'
import Router from 'vue-router'
import * as types from 'common/js/types'

const HomePage = r => require.ensure([], () => r(require('@/components/homePage')), 'homePage')
const CustomerManagement = r => require.ensure([], () => r(require('@/components/customerManagement')), 'customerManagement')
const CombinedReport = r => require.ensure([], () => r(require('@/components/combinedReport')), 'combinedReport')
const CustomerList = r => require.ensure([], () => r(require('@/components/customerList')), 'customerList')
const Remark = r => require.ensure([], () => r(require('@/components/remark')), 'remark')
const NewCustomer = r => require.ensure([], () => r(require('@/components/newCustomer')), 'newCustomer')
const WriteNotes = r => require.ensure([], () => r(require('@/base/writeNotes/writeNotes')), 'writeNotes')
const RiskRating = r => require.ensure([], () => r(require('@/components/riskRating')), 'riskRating')
const CashFlow = r => require.ensure([], () => r(require('@/components/cashFlow')), 'cashFlow')
const InsuranceAllocation = r => require.ensure([], () => r(require('@/components/insuranceAllocation')), 'insuranceAllocation')
const PdfReport = r => require.ensure([], () => r(require('@/components/pdfReport')), 'pdfReport')
const AssetAllocation = r => require.ensure([], () => r(require('@/components/assetAllocation')), 'assetAllocation')
const Recommend = r => require.ensure([], () => r(require('@/components/recommend')), 'recommend')
const ProductDetail = r => require.ensure([], () => r(require('@/components/productDetail')), 'productDetail')
const AboutMe = r => require.ensure([], () => r(require('@/components/aboutMe')), 'aboutMe')
const MyInfo = r => require.ensure([], () => r(require('@/components/myInfo')), 'myInfo')
const MyPerformance = r => require.ensure([], () => r(require('@/components/myPerformance')), 'myPerformance')
const MyVersion = r => require.ensure([], () => r(require('@/components/myVersion')), 'myVersion')
const Login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const Index = r => require.ensure([], () => r(require('@/components/index')), 'index')

// // import A from '@/components/a'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'HomePage',
      meta: {
      	navShow: true
      }
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/HomePage',
          name: 'HomePage',
          component: HomePage
        }, {
          path: '/customerList',
          name: 'CustomerList',
          component: CustomerList,
          meta: {
            // navShow: true,
            auth: true
          }
        }, {
          path: '/aboutMe',
          name: 'AboutMe',
          component: AboutMe,
          meta: {
            // navShow: true,
            auth: true
          }
        }
      ]
    // }, {
    //   path: '/customerList',
    //   name: 'CustomerList',
    //   component: CustomerList,
    //   meta: {
    //     navShow: true,
    //     auth: true
    //   }
    }, {
      path: '/remark',
      name: 'Remark',
      component: Remark,
      meta: {
      	navShow: false
      }
    }, {
      path: '/customerManagement/:id',
      name: 'CustomerManagement',
      component: CustomerManagement,
      meta: {
      	navShow: false
      }
    }, {
      path: '/combinedReport',
      name: 'CombinedReport',
      component: CombinedReport,
      meta: {
      	navShow: false
      }
    }, {
      path: '/newCustomer/:isMod', // isMod: 1 修改  0 新增
      name: 'NewCustomer',
      component: NewCustomer,
      meta: {
      	navShow: false
      }
    }, {
      path: '/writeNotes',
      name: 'WriteNotes',
      component: WriteNotes,
      meta: {
      	navShow: false
      }
    }, {
      path: '/riskRating',
      name: 'RiskRating',
      component: RiskRating,
      meta: {
        navShow: false
      }
    }, {
      path: '/cashFlow',
      name: 'CashFlow',
      component: CashFlow,
      meta: {
        navShow: false
      }
    }, {
      path: '/insuranceAllocation',
      name: 'InsuranceAllocation',
      component: InsuranceAllocation,
      meta: {
        navShow: false
      }
    }, {
      path: '/pdfReport',
      name: 'PdfReport',
      component: PdfReport,
      meta: {
        navShow: false
      }
    }, {
      path: '/assetAllocation',
      name: 'AssetAllocation',
      component: AssetAllocation,
      meta: {
        navShow: false
      }
    }, {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        navShow: false
      }
    // }, {
    //   path: '/a',
    //   name: 'A',
    //   component: A,
    //   meta: {
    //     navShow: false
    //   }
    }, {
      path: '/productDetail/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        navShow: false
      }
    // }, {
    //   path: '/aboutMe',
    //   name: 'AboutMe',
    //   component: AboutMe,
    //   meta: {
    //     navShow: true,
    //     auth: true
    //   }
    }, {
      path: '/myInfo',
      name: 'MyInfo',
      component: MyInfo,
      meta: {
        navShow: false
      }
    }, {
      path: '/myPerformance',
      name: 'MyPerformance',
      component: MyPerformance,
      meta: {
        navShow: false
      }
    }, {
      path: '/myVersion',
      name: 'MyVersion',
      component: MyVersion,
      meta: {
        navShow: false
      }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        navShow: false
      }
    }
  ]
})

// 页面刷新时，重新赋值 token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

// 登陆拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // console.log(store)
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { Rurl: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
