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
          path: '/addCommodity',
          name: 'addCommodity',
          meta: {
            title: '发布商品'
          },
          component: () => import('@/views/commodity/add')
        },
        {
          path: '/deleteCommodity',
          name: 'deleteCommodity',
          meta: {
            title: '商品删除'
          },
          component: () => import('@/views/commodity/delete')
        },
        {
          path: '/allOrders',
          name: 'allOrders',
          meta: {
            title: '全部订单'
          },
          component: () => import('@/views/orders/all')
        },
        {
          path: '/pay',
          name: 'pay',
          meta: {
            title: '待付款订单'
          },
          component: () => import('@/views/orders/pay')
        },
        {
          path: '/send',
          name: 'send',
          meta: {
            title: '待发货订单'
          },
          component: () => import('@/views/orders/send')
        },
        {
          path: '/receive',
          name: 'receive',
          meta: {
            title: '待收货订单'
          },
          component: () => import('@/views/orders/receive')
        },
        {
          path: '/addCategory',
          name: 'addCategory',
          meta: {
            title: '增加分类'
          },
          component: () => import('@/views/category/add')
        },
        {
          path: '/deleteCategory',
          name: 'deleteCategory',
          meta: {
            title: '删除分类'
          },
          component: () => import('@/views/category/delete')
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            title: '用户管理'
          },
          component: () => import('@/views/user')
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
