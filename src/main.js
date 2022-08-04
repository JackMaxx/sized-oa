/*
 * @Description: main
 * @Author: songyf
 * @Date: 2022-07-07
 * @LastEditTime: 2022-07-07
 * @LastEditors: songyf
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import rootStore from './store/index'
import '../static/css/main.css'
import echarts from 'echarts'
import permission from './permission' // 路由守卫以及刷新页面时的操作
/* axios封装 */
import {post, get} from './util/http'
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$echarts = echarts
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
const store = new Vuex.Store(rootStore)
permission(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
