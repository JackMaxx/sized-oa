/*
 * @Description: permission
 * @Author: songyf
 * @Date: 2022-07-07
 * @LastEditTime: 2022-07-07
 * @LastEditors: songyf
 */
import Vue from 'vue'
// import axios from 'axios'
import {
  Message
} from 'element-ui'

Vue.$message = Message
export default function permission (store, router) {
  // 挂载路由导航守卫
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next() // 登录页不需要做权限控制，直接放行
    // 获取token
    const userName = localStorage.getItem('userName')
    if (!userName) {
      Vue.$message({
        message: '请先登录',
        type: 'warning'
      })
      return next('/login') // 不存在token
    }
    // 存在token，直接放行
    next()
    const userData = store.getters.userData
    if (!userData) {
      store.commit('SET_USERDATA', 'sized')
    }
  })
}
