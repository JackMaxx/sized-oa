<!--
* @Description: 登录页面
* @Author: songyf
* @Date: 2021-02-16
* @LastEditTime: 2021-02-16
* @LastEditors: songyf
-->
<template>
  <div class="loginBg" id="login-page">
    <div class="loginBox">
      <div class="loginTitleBox">
        <div class="loginTitle">
          <img src="/static/image/login/logo.png" alt="">
          <span class="m-left10">OA管理系统</span>
        </div>
      </div>
      <div class="loginForm">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" label-width="80px">
          <el-form-item prop="username" class="item-input">
            <img src="/static/image/login/user.png" alt="" class="fl input-icon">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" class="fl" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password" class="item-input">
            <img src="/static/image/login/password.png" alt="" class="fl input-icon">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
              @keyup.enter.native="submitForm('loginForm')" class="fl" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item class="center" style="margin-bottom: 0;">
            <el-button type="primary" class="loginBtn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { isEmpty, setCookie } from '@/util/tool'
import { encryptByDES } from '@/util/encrypt'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberState: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]

      }
    }
  },
  mounted () {
    this.loginForm.username = isEmpty(localStorage.rememberUserName) === false ? localStorage.rememberUserName : ''
    this.loginForm.rememberState = isEmpty(localStorage.rememberState) === false
  },
  methods: {
    submitForm (formName) {
      // this.$router.push('/client/customerEntry')
      let vm = this
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.$post(`/userLogin/login`,
            {
              username: vm.loginForm.username,
              password: encryptByDES(vm.loginForm.password)
            }
          )
            .then(({ data }) => {
              if (data.success) { // 记住用户名
                this.$store.commit('SET_USERUUID', data.data.userUuid)
                localStorage.setItem('userName', vm.loginForm.username)
                localStorage.setItem('userUuid', data.data.userUuid)
                localStorage.setItem('admin', data.data.admin)
                setCookie('sized-oa', vm.loginForm.username)
                vm.$router.push('/client/customerEntry')
              } else {
                vm.$message({
                  message: data.msg,
                  type: 'error'
                })
              }
            })
            // eslint-disable-next-line handle-callback-err
            .catch(function (error) {
              vm.$message({
                message: '服务异常，请联系管理员',
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>
