<!--
 * @Author: LaMando
 * @LastEditors: LaMando
 * @Description: 项目入口
 * @Date: 202=2/02/26 11:11:11
 * @LastEditTime:
 -->

<template>
  <div class="index-body">
    <v-header></v-header>
    <nav-sider class="nav-box fl"></nav-sider>
    <div class="main-box home-body fl">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navSider from './nav/NavSider.vue'
import vHeader from './nav/header.vue'

export default {
  components: {
    navSider,
    vHeader
  }
}
</script>

<style>
.index-body {
  width: 100%;
  min-width: 1366px;
}
.index-body > .nav-box {
  width: 200px;
  height: calc(100vh - 48px);
  border-right: 1px solid #e6e6e6;
}
.index-body > .nav-box .el-menu {
  border-right: none;
}
.index-body > .main-box {
  width: calc(100% - 202px);
  height: calc(100vh - 48px);
  box-sizing: border-box;
}
</style>
