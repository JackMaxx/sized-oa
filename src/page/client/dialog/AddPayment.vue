<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 付款
 * @Date: 2022.8.15
 -->
 <template>
  <div>
    <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="120px" class="demo-ruleForm"
      label-position="left">
      <el-form-item label="付款事由：">
        <el-input type="textarea" placeholder="请填写" v-model="taskForm.payReason" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="付款金额：" prop="amount">
        <el-input class="no-number" placeholder="请填写" :disabled="isShow" type="number" v-model="taskForm.amount" @input="changMixFee">
        </el-input>
      </el-form-item>
      <el-form-item label="付款时间：" prop="payTime">
        <el-date-picker v-model="taskForm.payTime" :disabled="isShow" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="请选择" :editable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收款人全称：" prop="payee">
        <el-input v-model="taskForm.payee" placeholder="请填写" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="bankAccount">
        <el-input class="no-number" placeholder="请填写" :disabled="isShow" type="number" v-model="taskForm.bankAccount" @input="changMixFee">
        </el-input>
      </el-form-item>
      <el-form-item label="开户行：" prop="bankName">
        <el-input v-model="taskForm.bankName" placeholder="请填写" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="备注说明：">
        <el-input type="textarea" v-model="taskForm.remark" :disabled="isShow" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="合作对象：">
        <el-input v-model="taskForm.coopObjUuid" :disabled="isShow" placeholder="请填写"></el-input>
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
        payReason: '',
        amount: null,
        payTime: null,
        payee: '',
        bankAccount: null,
        bankName: '',
        remark: '',
        coopObjUuid: ''
      },
      rules: {
        amount: [{ required: true, message: '请输入', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入', trigger: 'blur' }],
        payTime: [{ required: true, message: '请选择', trigger: 'change' }],
        payee: [{ required: true, message: '请输入', trigger: 'blur' }],
        coopObjUuid: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    }
  },
  props: {
    rowPayData: {
      type: Object,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
  },
  mounted () {
    if (this.rowPayData) {
      this.taskForm = intersectObj(this.taskForm, this.rowPayData)
    }
  }
}
</script>
<style scoped>
</style>
