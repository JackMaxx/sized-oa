/*
 * @Description: 全局store配置
 * @Author: songyf
 * @Date: 2022-07-07
 * @LastEditTime: 2022-07-07
 * @LastEditors: songyf
 */

const rootStore = {
  state: {
    userData: null,
    userUuid: ''
  },
  getters: {
    userData: state => state.userData,
    userUuid: state => state.userUuid
  },
  mutations: {
    SET_USERDATA (state, payload) {
      state.userData = payload
    },
    SET_USERUUID (state, payload) {
      state.userUuid = payload
    }
  },
  modules: {
  }
}

export default rootStore
