<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 人员管理（添加）
 * @Date: 2022.6.23
 -->
 <template>
  <div>
    <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm"
      label-position="left">
      <el-form-item label="人员姓名：" prop="realName">
        <el-input v-model="taskForm.realName" placeholder="请输入人员姓名"></el-input>
      </el-form-item>
      <el-form-item label="入职时间：" prop="entryTime">
        <el-date-picker v-model="taskForm.entryTime" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="请选择入职时间" :editable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账号：" prop="loginName">
        <el-input v-model="taskForm.loginName" placeholder="请输入账号"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/babel">
import { intersectObj } from '@/util/tool'
export default {
  data () {
    return {
      taskForm: {
        realName: '',
        entryTime: null,
        loginName: ''
      },
      rules: {
        realName: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' }
        ],
        entryTime: [
          { required: true, message: '请选择入职时间', trigger: 'change' }
        ],
        loginName: [
          { pattern: /^[a-zA-Z]+$/, message: '账号只能包含字母', trigger: 'blur' },
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    rowData: {
      type: Object,
      default: null
    }
  },
  watch: {
  },
  mounted () {
    if (this.rowData) {
      this.taskForm = intersectObj(this.taskForm, this.rowData)
    }
  }
}
</script>
<style scoped>
</style>
