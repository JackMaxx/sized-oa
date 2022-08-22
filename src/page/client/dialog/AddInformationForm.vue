<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 合作中的人才 / 出入信息登记
 * @Date: 2022.6.23
 -->
 <template>
  <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="180px" class="demo-ruleForm"
    label-position="right">
    <el-form-item label="人才姓名：" prop="talentName">
      <el-input v-model="taskForm.talentName" :disabled="isShow"></el-input>
    </el-form-item>
    <el-form-item label="收证日期：" prop="receiptTime">
      <el-date-picker :disabled="isShow" v-model="taskForm.receiptTime" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请选择入职日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="业务发生时间：" prop="businessTime">
      <el-date-picker :disabled="isShow" v-model="taskForm.businessTime" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请选择入职日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="最终利润：" prop="finalProfit">
      <el-input disabled type="number" v-model="taskForm.finalProfit"></el-input>
    </el-form-item>
    <el-form-item label="企业价格/年限：" prop="companyPrice">
      <div>
        <el-input class="no-number" :disabled="isShow" type="number" v-model="taskForm.companyPrice" style="width:40%;"
          @input="changCompanyPrice"></el-input>
        <span>元</span>
        <el-input class="no-number" :disabled="isShow" type="number" v-model="taskForm.years" style="width:40%;">
        </el-input>
        <span>年</span>
      </div>
    </el-form-item>
    <el-form-item label="人才价格/合同期限：" prop="talentPrice">
      <div>
        <el-input class="no-number" :disabled="isShow" type="number" v-model="taskForm.talentPrice" style="width:40%;"
          @input="changTalentPrice"></el-input>
        <span>元</span>
        <el-input class="no-number" :disabled="isShow" type="number" v-model="taskForm.contractPeriod"
          style="width:40%;"></el-input>
        <span>年</span>
      </div>
    </el-form-item>
    <el-form-item label="杂费：" prop="mixFee">
      <el-input class="no-number" :disabled="isShow" type="number" v-model="taskForm.mixFee" @input="changMixFee">
      </el-input>
    </el-form-item>
    <el-form-item label="合作对象：" v-if="isShow">
      <el-input v-model="taskForm.coopBusinessName" disabled></el-input>
    </el-form-item>
    <!-- <el-form-item label="手机号：" prop="iphoneNumber">
      <el-input :disabled="isShow" v-model="taskForm.iphoneNumber" maxlength="11"></el-input>
    </el-form-item> -->
    <!-- 备注多行文本 -->
    <el-form-item label="备注：">
      <el-input type="textarea" v-model="taskForm.remark" :disabled="isShow"></el-input>
    </el-form-item>
  </el-form>
</template>
<script type="text/babel">
import { intersectObj } from '@/util/tool'
export default {
  data () {
    // 校验重复Cellphone
    const checkFinalProfit = (rule, value, callback) => {
      if (value) {
        if (value < 0) {
          callback(new Error('最终利润不能少于0，请重新输入'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      taskForm: {
        talentName: '', // 人才姓名
        receiptTime: null, // 收证时间
        businessTime: null, // 业务发生时间
        finalProfit: null, // 最终利润
        talentPrice: null, // 人才价格
        contractPeriod: null, // 合同期限
        companyPrice: null, // 企业价格
        years: null, // 年限
        mixFee: null, // 杂费
        coopBusinessName: '',
        remark: '' // 备注
      },
      rules: {
        talentName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        talentPrice: [
          { required: true, message: '请输入人才价格', trigger: 'blur' }
        ],
        companyPrice: [
          { required: true, message: '请输入企业价格', trigger: 'blur' }
        ],
        mixFee: [
          { required: true, message: '请输入杂费', trigger: 'blur' }
        ],
        finalProfit: [
          {
            validator: checkFinalProfit
          }
        ]
      }
    }
  },
  props: {
    rowData: {
      type: Object,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.rowData) {
      this.taskForm = intersectObj(this.taskForm, this.rowData)
    }
  },
  methods: {
    // 人才价格
    changTalentPrice (val) {
      if (this.taskForm.companyPrice && this.taskForm.mixFee) {
        const companyPrice = this.taskForm.companyPrice
        const mixFee = this.taskForm.mixFee
        this.taskForm.finalProfit = companyPrice - val - mixFee
      }
    },
    // 企业价格
    changCompanyPrice (val) {
      if (this.taskForm.talentPrice && this.taskForm.mixFee) {
        const talentPrice = this.taskForm.talentPrice
        const mixFee = this.taskForm.mixFee
        this.taskForm.finalProfit = val - talentPrice - mixFee
      }
    },
    // 杂费
    changMixFee (val) {
      if (this.taskForm.talentPrice && this.taskForm.companyPrice) {
        const companyPrice = this.taskForm.companyPrice
        const talentPrice = this.taskForm.talentPrice
        this.taskForm.finalProfit = companyPrice - talentPrice - val
      }
    }
  }
}
</script>
<style scoped>
</style>
