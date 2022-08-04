<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 公海
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="人才" name="pane1">
        <HighSeasPersonal></HighSeasPersonal>
      </el-tab-pane>
      <el-tab-pane label="企业" name="pane2">
        <HighSeasEnterprise></HighSeasEnterprise>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">
import HighSeasPersonal from './HighSeasPersonal.vue'
import HighSeasEnterprise from './HighSeasEnterprise.vue'
export default {
  components: {
    HighSeasPersonal,
    HighSeasEnterprise
  },
  data () {
    return {
      activeName: 'pane1'
    }
  }
}
</script>
<style scoped>
</style>
