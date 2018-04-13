import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/homePage'
import CustomerManagement from '@/components/customerManagement'
import CombinedReport from '@/components/combinedReport'
import CustomerList from '@/components/customerList'
import Remark from '@/components/remark'
import NewCustomer from '@/components/newCustomer'
import WriteNotes from '@/base/writeNotes/writeNotes'
import RiskRating from '@/components/riskRating'
import CashFlow from '@/components/cashFlow'
import InsuranceAllocation from '@/components/insuranceAllocation'
import PdfReport from '@/components/pdfReport'
import AssetAllocation from '@/components/assetAllocation'
import Recommend from '@/components/recommend'
import A from '@/components/a'
import ProductDetail from '@/components/productDetail'
import AboutMe from '@/components/aboutMe'
import MyInfo from '@/components/myInfo'
import MyPerformance from '@/components/myPerformance'
import MyVersion from '@/components/myVersion'
import Login from '@/components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
      	navShow: true
      }
    }, {
      path: '/customerList',
      name: 'CustomerList',
      component: CustomerList,
      meta: {
        navShow: true,
        auth: true
      }
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
      path: '/newCustomer/:num',
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
    }, {
      path: '/a',
      name: 'A',
      component: A,
      meta: {
        navShow: false
      }
    }, {
      path: '/productDetail',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        navShow: false
      }
    }, {
      path: '/aboutMe',
      name: 'AboutMe',
      component: AboutMe,
      meta: {
        navShow: true,
        auth: true
      }
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
    }, {
      path: '/',
      redirect: 'HomePage',
      meta: {
      	navShow: true
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(next)
//   console.log(from)
// })

export default router
