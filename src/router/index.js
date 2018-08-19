import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from './home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...home,
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
