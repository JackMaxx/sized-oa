<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 付款
 * @Date: 2022.8.15
 -->
 <template>
  <div>
    <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm"
      label-position="left">
      <el-form-item label="付款事由：">
        <el-input type="textarea" placeholder="请填写" v-model="taskForm.remark" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="付款金额：" prop="mixFee">
        <el-input class="no-number" placeholder="请填写" :disabled="isShow" type="number" v-model="taskForm.mixFee" @input="changMixFee">
        </el-input>
      </el-form-item>
      <el-form-item label="付款时间：" prop="entryTime">
        <el-date-picker v-model="taskForm.entryTime" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="请选择" :editable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收款人全称：" prop="realName">
        <el-input v-model="taskForm.realName" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="mixFee">
        <el-input class="no-number" placeholder="请填写" :disabled="isShow" type="number" v-model="taskForm.mixFee" @input="changMixFee">
        </el-input>
      </el-form-item>
      <el-form-item label="开户行：" prop="realName">
        <el-input v-model="taskForm.realName" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="备注说明：">
        <el-input type="textarea" v-model="taskForm.remark" :disabled="isShow" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="合作对象：" prop="personnelName">
        <el-select v-model="transForm.personnelName" placeholder="请选择">
          <el-option v-for="(item, index) in personnelNameList" :label="item.businessName" :value="item.uuid"
            :key="index">
          </el-option>
        </el-select>
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
