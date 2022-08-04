<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 保护期
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="人才" name="pane1">
        <ProtectionPeriod></ProtectionPeriod>
      </el-tab-pane>
      <el-tab-pane label="企业" name="pane2">
        <ProtectionEntry></ProtectionEntry>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">
import ProtectionPeriod from './ProtectionPeriod.vue'
import ProtectionEntry from './ProtectionEntry.vue'
export default {
  components: {
    ProtectionPeriod,
    ProtectionEntry
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
