import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

const requireRouter = require.context('.', false, /\.js/)

let routes = []
requireRouter.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const requireConfig = requireRouter(fileName)
  const routerArr = requireConfig.default || requireConfig
  routes = [ ...routes, ...routerArr ]
})

const router = new Router({
  mode: 'history',
  routes: [
    ...routes,
    {
      path: '/',
      name: 'Index',
      meta: {
        title: 'Dengwb Web'
      },
      component: Index
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.body.style.backgroundColor = to.meta.backgroundColor || '#FFF'
  document.title = to.query.title || to.meta.title
  next()
})

export default router