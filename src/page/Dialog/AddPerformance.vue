<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 业绩 / 业绩表（添加）
 * @Date: 2022.6.23
 -->
 <template>
  <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm"
    label-position="right">
    <el-form-item label="人员姓名：" prop="name">
      <el-input v-model="taskForm.name"></el-input>
    </el-form-item>
    <el-form-item label="业绩目标：" prop="performance">
      <el-input type="number" v-model="taskForm.performance"></el-input>
    </el-form-item>
    <el-form-item label="回款目标：" prop="moneyBack">
      <el-input type="number" v-model="taskForm.moneyBack"></el-input>
    </el-form-item>
  </el-form>
</template>
<script type="text/babel">
export default {
  data () {
    return {
      taskForm: {
        name: '',
        performance: null,
        moneyBack: null
      },
      rules: {
        name: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' }
        ],
        performance: [
          { required: true, message: '请输入累计业绩', trigger: 'blur' }
        ],
        moneyBack: [
          { required: true, message: '请输入累计回款', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
