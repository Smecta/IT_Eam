import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import moment from 'moment'


Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

// 全局定义过滤器 日期过滤器，只过滤到年月日
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment
Vue.filter('dateYMDFormat',function(dateStr,pattern='YYYY-MM-DD'){
  return moment(dateStr).format(pattern);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
