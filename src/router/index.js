import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Grail = () => import('../home/Grail.vue')

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  meta: {},
  name: 'login',
  component: resolve => require(['../home/login/login.vue'], resolve)
},
  // 后台首页
{
  path: '/client',
  meta: {
    title: '客户端'
  },
  name: 'menu_client',
  component: Grail,
  children: [{
    path: '/client/customerEntry',
    meta: {
      title: '人才录入'
    },
    name: 'menu_customerEntry',
    component: resolve =>
      require(['../page/client/customer/customerEntry.vue'], resolve)
  },
  {
    path: '/client/protectPeriod',
    meta: {
      title: '保护期'
    },
    name: 'menu_protectPeriod',
    component: resolve =>
      require(['../page/client/protect/protectAll.vue'], resolve)
  },
  {
    path: '/client/signedContract',
    meta: {
      title: '证书库'
    },
    name: 'menu_signedContract',
    component: resolve =>
      require(['../page/client/SignedContract.vue'], resolve)
  },
  {
    path: '/client/cooperativeTalents',
    meta: {
      title: '合作中的人才'
    },
    name: 'menu_cooperativeTalents',
    component: resolve =>
      require(['../page/client/CooperativeTalents.vue'], resolve)
  },
  {
    path: '/client/JointVenture',
    meta: {
      title: '合作中的企业'
    },
    name: 'menu_jointVenture',
    component: resolve =>
      require(['../page/client/JointVenture.vue'], resolve)
  }
  ]
},
  // 业绩
{
  path: '/performance',
  meta: {
    title: '业绩'
  },
  name: 'menu_performance',
  component: Grail,
  children: [{
    path: '/performance/performanceList',
    meta: {
      title: '业绩榜'
    },
    name: 'menu_performanceList',
    component: resolve =>
      require(['../page/performance/PerformanceList.vue'], resolve)
  }
  ]
},
  // 审核单
{
  path: '/checklist',
  meta: {
    title: '审核单'
  },
  name: 'menu_checklist',
  component: Grail,
  children: [{
    path: '/checklist',
    meta: {
      title: '审核单'
    },
    name: 'menu_checklist',
    component: resolve =>
      require(['../page/Checklist/Checklist.vue'], resolve)
  }]
},
  // 公海
{
  path: '/highSeas',
  meta: {
    title: '公海'
  },
  name: 'menu_highSeas',
  component: Grail,
  children: [{
    path: '/highSeas',
    meta: {
      title: '公海'
    },
    name: 'menu_highSeas',
    component: resolve =>
      require(['../page/HighSeas/HighSeas.vue'], resolve)
  }]
},
  // 人员管理
{
  path: '/PersonnelManagement',
  meta: {
    title: '人员管理'
  },
  name: 'menu_personnelManagement',
  component: Grail,
  children: [{
    path: '/PersonnelManagement',
    meta: {
      title: '业绩表'
    },
    name: 'menu_personnelManagement',
    component: resolve =>
      require(['../page/PersonnelManagement.vue'], resolve)
  }]
}
]

const router = new Router({
  routes
})

export default router
