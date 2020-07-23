import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import echarts from 'echarts'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import $ from 'jquery'
// import SocketIO from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://127.0.0.1:8443/login')
// }))
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // sockets: {
  //   connect: function() {
  //     console.log('socket connetcted')
  //   },
  //   res: function(val) {
  //     console.log('接收到服务端消息', val)
  //   }
  // }
})

Vue.prototype.$echarts = echarts
Vue.prototype.$ = $

