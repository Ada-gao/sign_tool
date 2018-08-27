import Vue from 'vue'
import store from 'common/js/store.js'
import Router from 'vue-router'
import * as types from 'common/js/types'

const HomePage = r => require.ensure([], () => r(require('@/components/product/homePage')), 'homePage')
const CustomerManagement = r => require.ensure([], () => r(require('@/components/client/customerManagement')), 'customerManagement')
const CombinedReport = r => require.ensure([], () => r(require('@/components/combinedReport')), 'combinedReport')
const CustomerList = r => require.ensure([], () => r(require('@/components/client/customerList')), 'customerList')
const Remark = r => require.ensure([], () => r(require('@/components/mine/remark')), 'remark')
const NewCustomer = r => require.ensure([], () => r(require('@/components/client/newCustomer')), 'newCustomer')
const WriteNotes = r => require.ensure([], () => r(require('@/base/writeNotes/writeNotes')), 'writeNotes')
const RiskRating = r => require.ensure([], () => r(require('@/components/riskRating')), 'riskRating')
const CashFlow = r => require.ensure([], () => r(require('@/components/cashFlow')), 'cashFlow')
const InsuranceAllocation = r => require.ensure([], () => r(require('@/components/insuranceAllocation')), 'insuranceAllocation')
const PdfReport = r => require.ensure([], () => r(require('@/components/product/pdfReport')), 'pdfReport')
const PptReport = r => require.ensure([], () => r(require('@/components/pptReport')), 'pptReport')
const ProductReport = r => require.ensure([], () => r(require('@/components/productReport')), 'productReport')
const AssetAllocation = r => require.ensure([], () => r(require('@/components/assetAllocation')), 'assetAllocation')
const Recommend = r => require.ensure([], () => r(require('@/components/recommend')), 'recommend')
const ProductDetail = r => require.ensure([], () => r(require('@/components/product/productDetail')), 'productDetail')
const AboutMe = r => require.ensure([], () => r(require('@/components/mine/aboutMe')), 'aboutMe')
const MyInfo = r => require.ensure([], () => r(require('@/components/mine/myInfo')), 'myInfo')
const MyPerformance = r => require.ensure([], () => r(require('@/components/myPerformance')), 'myPerformance')
const MyVersion = r => require.ensure([], () => r(require('@/components/mine/myVersion')), 'myVersion')
const Barcodescanner = r => require.ensure([], () => r(require('@/components/mine/barcodescanner')), 'barcodescanner')
const Login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const Index = r => require.ensure([], () => r(require('@/components/index')), 'index')
const Certified = r => require.ensure([], () => r(require('@/components/client/certified')), 'certified')
const AutoTransfer = r => require.ensure([], () => r(require('@/components/client/autoTransfer')), 'autoTransfer')
const PotentialCustomerList = r => require.ensure([], () => r(require('@/components/client/potentialCustomerList')), 'potentialCustomerList')
const PurchasedProducts = r => require.ensure([], () => r(require('@/components/purchasedProducts')), 'purchasedProducts')
const PerfectInfos = r => require.ensure([], () => r(require('@/components/client/perfectInfos')), 'perfectInfos')
const Bankcard = r => require.ensure([], () => r(require('@/components/client/bankcard')), 'bankcard')
const BankcardInfos = r => require.ensure([], () => r(require('@/components/client/bankcardInfos')), 'bankcardInfos')
const NoInternet = r => require.ensure([], () => r(require('@/components/noInternet')), 'noInternet')
const Report = r => require.ensure([], () => r(require('@/base/report/pdf')), 'report')
const ReservationList = r => require.ensure([], () => r(require('@/components/appointment/reservationList')), 'reservationList')
const ProductAppointment = r => require.ensure([], () => r(require('@/components/appointment/productAppointment')), 'productAppointment')
const BankList = r => require.ensure([], () => r(require('@/base/bankList')), 'bankList')
const CustomerNameList = r => require.ensure([], () => r(require('@/components/appointment/customerNameList')), 'customerNameList')
const activityList = r => require.ensure([], () => r(require('@/components/activity/activityList')), 'activityList')
const activityDetail = r => require.ensure([], () => r(require('@/components/activity/activityDetail')), 'activityDetail')
const clientSignedList = r => require.ensure([], () => r(require('@/components/activity/clientSignedList')), 'clientSignedList')
const clientList = r => require.ensure([], () => r(require('@/components/activity/clientList')), 'clientList')
const clientSigned = r => require.ensure([], () => r(require('@/components/activity/clientSigned')), 'clientSigned')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'HomePage'
    },
    {
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
          path: '/reservationList',
          name: 'ReservationList',
          component: ReservationList,
          meta: {
            auth: true
          }
        }, {
          path: '/customerList/:mark',
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
    },
    {
      path: '/remark',
      name: 'Remark',
      component: Remark,
      meta: {
        auth: true
      }
    },
    {
      path: '/customerManagement/:id',
      props: true,
      name: 'CustomerManagement',
      component: CustomerManagement,
      meta: {
        auth: true
      }
    },
    {
      path: '/combinedReport',
      name: 'CombinedReport',
      component: CombinedReport,
      meta: {
        auth: true
      }
    },
    {
      path: '/newCustomer',
      name: 'NewCustomer',
      component: NewCustomer,
      meta: {
        auth: true
      }
    },
    {
      path: '/writeNotes',
      name: 'WriteNotes',
      component: WriteNotes,
      meta: {
        auth: true
      }
    },
    {
      path: '/riskRating',
      name: 'RiskRating',
      component: RiskRating,
      meta: {
        auth: true
      }
    },
    {
      path: '/cashFlow',
      name: 'CashFlow',
      component: CashFlow,
      meta: {
        // navShow: false
        auth: true
      }
    },
    {
      path: '/insuranceAllocation',
      name: 'InsuranceAllocation',
      component: InsuranceAllocation,
      meta: {
        // navShow: false
        auth: true
      }
    },
    {
      path: '/pdfReport/:id',
      name: 'PdfReport',
      component: PdfReport,
      meta: {
        navShow: false
      }
    },
    {
      path: '/pptReport/:id',
      name: 'PptReport',
      component: PptReport,
      meta: {
        navShow: false
      }
    },
    {
      path: '/productReport/:id',
      name: 'ProductReport',
      component: ProductReport,
      meta: {
        navShow: false
      }
    },
    {
      path: '/assetAllocation',
      name: 'AssetAllocation',
      component: AssetAllocation,
      meta: {
        // navShow: false
        auth: true
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        // navShow: false
        auth: true
      }
    },
    {
      path: '/productDetail/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        navShow: false
      }
    },
    {
      path: '/myInfo',
      name: 'MyInfo',
      component: MyInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/myPerformance',
      name: 'MyPerformance',
      component: MyPerformance,
      meta: {
        auth: true
      }
    },
    {
      path: '/myVersion',
      name: 'MyVersion',
      component: MyVersion,
      meta: {
        // navShow: false
        auth: true
      }
    },
    {
      path: '/barcodescanner',
      name: 'Barcodescanner',
      component: Barcodescanner,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        navShow: false
      }
    },
    {
      path: '/certified/:id',
      name: 'Certified',
      component: Certified,
      meta: {
        auth: true
      }
    },
    {
      path: '/autoTransfer',
      name: 'AutoTransfer',
      component: AutoTransfer,
      meta: {
        auth: true
      }
    },
    {
      path: '/potentialCustomerList/:id',
      name: 'PotentialCustomerList',
      component: PotentialCustomerList,
      meta: {
        auth: true
      }
    },
    {
      path: '/purchasedProducts/:id',
      name: 'PurchasedProducts',
      component: PurchasedProducts,
      meta: {
        auth: true
      }
    },
    {
      path: '/perfectInfos',
      name: 'PerfectInfos',
      component: PerfectInfos,
      meta: {
        auth: true
        // keepAlive: true
      }
    },
    {
      path: '/bankcard',
      name: 'Bankcard',
      component: Bankcard,
      meta: {
        auth: true
      }
    },
    {
      path: '/bankcardInfos',
      name: 'BankcardInfos',
      component: BankcardInfos,
      meta: {
        auth: true
      }
    },
    {
      path: '/noInternet',
      name: 'NoInternet',
      component: NoInternet,
      meta: {
        auth: true
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta: {
        auth: true
      }
    },
    {
      path: '/productAppointment',
      name: 'ProductAppointment',
      component: ProductAppointment,
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/bankList',
      name: 'BankList',
      component: BankList,
      meta: {
        auth: true
      }
    },
    {
      path: '/customerNameList',
      name: 'CustomerNameList',
      component: CustomerNameList,
      meta: {
        auth: true
      }
    },
    {
      path: '/activityList',
      name: 'activityList',
      component: activityList,
      meta: {
        auth: true
      }
    },
    {
      path: '/activityDetail',
      name: 'activityDetail',
      component: activityDetail,
      meta: {
        auth: true
      }
    },
    {
      path: '/clientSignedList',
      name: 'clientSignedList',
      component: clientSignedList,
      meta: {
        auth: true
      }
    },
    {
      path: '/clientList',
      name: 'clientList',
      component: clientList,
      meta: {
        auth: true
      }
    },
    {
      path: '/clientSigned/:id',
      name: 'clientSigned',
      component: clientSigned,
      meta: {
        auth: true
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
  window.scrollTo(0, 0)
  if (to.matched.some(m => m.meta.auth)) {
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
