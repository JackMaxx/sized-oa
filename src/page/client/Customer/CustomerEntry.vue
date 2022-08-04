<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 人才录入
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="人才" name="pane1">
        <TalentEntry></TalentEntry>
      </el-tab-pane>
      <el-tab-pane label="企业" name="pane2">
        <EnterpriseEntry></EnterpriseEntry>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/babel">
import {getCookie} from '@/util/tool'
import TalentEntry from './TalentEntry.vue'
import EnterpriseEntry from './EnterpriseEntry.vue'
export default {
  components: {
    TalentEntry,
    EnterpriseEntry
  },
  data () {
    return {
      activeName: 'pane1'
    }
  },
  created () {
    console.log(getCookie('sized-oa'))
  }
}
</script>
<style scoped>
</style>
