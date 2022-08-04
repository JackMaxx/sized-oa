import Vue from 'vue'
import axios from 'axios'

import {
  Message
} from 'element-ui'

Vue.prototype.$message = Message

axios.defaults.timeout = 60000
// axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.post['Cookies'] = 'JSESSIONID=9D34E7B5B12B3212AF41D23DE1BEB7C0'
axios.defaults.withCredentials = true
// 请求拦截
// axios.interceptors.request.use((config) => {
//   let userToken = window.localStorage.getItem('token')
//   if (userToken) {
//     config.headers.common['Authorization'] = userToken
//   }
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })
const devUrl = 'http://192.168.212.40:9000/api' // 开发环境、
const proUrl = window.location.origin // 生成环境
let axiosUrl = ''
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') { // 判断出当前是开发环境还是生成环境，
  axiosUrl = devUrl
} else {
  axiosUrl = proUrl
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(`${axiosUrl}` + url, {
      params: params
    }).then(checkTimeout).then(res => {
      resolve(res)
    }, err => {
      checkTimeout(err)
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(`${axiosUrl}` + url, data)
      .then(checkTimeout).then(res => {
        resolve(res)
      }, err => {
        checkTimeout(err)
        reject(err)
      })
  })
}

function checkTimeout (res) {
  if (res && res.response && res.response.status === 401) {
    Vue.prototype.$message({
      message: res.response.data.msg,
      type: 'error'
    })
    localStorage.clear()
    sessionStorage.clear()
    setTimeout(() => {
      if (!document.querySelector('#login-page')) {
        location.reload('/login')
      }
    }, 1000)
  } else {
    return res
  }
}
