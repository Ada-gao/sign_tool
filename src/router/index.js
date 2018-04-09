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

Vue.use(Router)

export default new Router({
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
      	navShow: true
      }
    }, {
      path: '/remark',
      name: 'Remark',
      component: Remark,
      meta: {
      	navShow: false
      }
    }, {
      path: '/customerManagement',
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
      path: '/',
      redirect: 'HomePage',
      meta: {
      	navShow: true
      }
    }
  ]
})
