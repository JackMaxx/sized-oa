<!--
 * @Author: LaMando
 * @LastEditors: LaMando
 * @Description: 头部
 * @Date: 2022/02/26 11:11:11
 * @LastEditTime:
 -->

<template>
  <div class="header">
    <div class="logo fl">
      <img src="/static/image/login/logo.png" alt="">
      <span>OA管理系统</span>
    </div>
    <div class="fr user">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img src="/static/image/system/UserPhoto.png" class="avatar" alt="" />
          {{username}}
          <i class="iconfont icon-shut-down" style="font-size: 16px; color: #fff" title="退出"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="btn-box" @click="logout">
              <span>退出登录 </span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
     <audio controls="controls" hidden src="/static/res/msg.mp3" ref="audio"></audio>
    <!-- socket接收页面 -->
    <socket></socket>
  </div>
</template>
<script>
import { delCookie } from '@/util/tool'
import socket from '../Socket.vue'
export default {
  components: {
    socket
  },
  data () {
    return {
      username: localStorage.getItem('userName')
    }
  },
  computed: {
  },
  created () {
    this.getSocket()
  },
  methods: {
    getSocket () {
      // 申请服务端创建聊天室，发送head告警推送
      const userUuid = localStorage.getItem('userUuid')
      this.$get('/socketio/createNameSpace/' + userUuid)
    },
    logout () {
      this.$get(`/userLogin/logout`).then(({ data }) => {
        if (data.success) {
          this.$message({ showClose: true, type: 'success', message: data.msg })
          this.$router.push('/login')
          delCookie('sized-oa')
          localStorage.clear()
        } else {
          this.$message({ showClose: true, type: 'error', message: data.msg })
        }
      })
    }
  }

}
</script>
<style lang="stylus"></style>
