import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/************AXIOS**************/
import http from "./tools/promise.js"; //请求封装
Vue.prototype.$http = http;
/************AXIOS**************/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
