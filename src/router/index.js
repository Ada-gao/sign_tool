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
const PptReport = r => require.ensure([], () => r(require('@/components/pptReport')), 'pdfReport')
const ProductReport = r => require.ensure([], () => r(require('@/components/productReport')), 'pdfReport')
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
      redirect: 'HomePage'
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
      // meta: {
      //   auth: true
      // },
      children: [
        {
          path: '/HomePage',
          name: 'HomePage',
          component: HomePage,
          meta: {
            auth: true
          }
        }, {
          path: '/customerList',
          name: 'CustomerList',
          component: CustomerList,
          meta: {
            auth: true
          }
        }, {
          path: '/aboutMe',
          name: 'AboutMe',
          component: AboutMe,
          meta: {
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
        // navShow: false
        auth: true
      }
    }, {
      path: '/customerManagement/:id',
      props: true,
      name: 'CustomerManagement',
      component: CustomerManagement,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/combinedReport',
      name: 'CombinedReport',
      component: CombinedReport,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/newCustomer/:isMod', // isMod: 1 修改  0 新增
      name: 'NewCustomer',
      component: NewCustomer,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/writeNotes',
      name: 'WriteNotes',
      component: WriteNotes,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/riskRating',
      name: 'RiskRating',
      component: RiskRating,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/cashFlow',
      name: 'CashFlow',
      component: CashFlow,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/insuranceAllocation',
      name: 'InsuranceAllocation',
      component: InsuranceAllocation,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/pdfReport',
      name: 'PdfReport',
      component: PdfReport,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/pptReport',
      name: 'PptReport',
      component: PptReport,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/productReport',
      name: 'ProduvtReport',
      component: ProductReport,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/assetAllocation',
      name: 'AssetAllocation',
      component: AssetAllocation,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        // navShow: false
        auth: true
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
        // navShow: false
        auth: true
      }
    }, {
      path: '/myPerformance',
      name: 'MyPerformance',
      component: MyPerformance,
      meta: {
        // navShow: false
        auth: true
      }
    }, {
      path: '/myVersion',
      name: 'MyVersion',
      component: MyVersion,
      meta: {
        // navShow: false
        auth: true
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
} else {

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
