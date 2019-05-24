import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        title: '购物APP后台管理系统'
      },
      component: () => import('@/views/login')
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/homepage',
      meta: {
        title: '首页'
      },
      component: () => import('@/views/index'),
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/homepage')
        },
        {
          path: '/chartadd',
          name: 'chartadd',
          meta: {
            title: '轮播图添加'
          },
          component: () => import('@/views/chart/add')
        },
        {
          path: '/chartdelete',
          name: 'chartdelete',
          meta: {
            title: '轮播图删除'
          },
          component: () => import('@/views/chart/delete')
        },
        {
          path: '/allnews',
          name: 'allnews',
          meta: {
            title: '全部订单'
          },
          component: () => import('@/views/news/all')
        },
        {
          path: '/audit',
          name: 'audit',
          meta: {
            title: '待付款订单'
          },
          component: () => import('@/views/news/audit')
        },
        {
          path: '/audited',
          name: 'audited',
          meta: {
            title: '待发货订单'
          },
          component: () => import('@/views/news/audited')
        },
        {
          path: '/failed',
          name: 'failed',
          meta: {
            title: '待收货订单'
          },
          component: () => import('@/views/news/failed')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})

export default router
