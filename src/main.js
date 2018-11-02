// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueDND from 'awe-dnd'
import dragging from './plugins/dragging.js'

Vue.config.productionTip = false

Vue.use(VueDND)
Vue.use(dragging)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
