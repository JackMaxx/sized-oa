<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 合作中的人才
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realName" label="人才姓名"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="coopBusinessName" label="合作对象"></el-table-column>
      <!-- <el-table-column prop="years" label="年限"></el-table-column>
      <el-table-column prop="profit" label="利润"></el-table-column> -->
      <el-table-column prop="socialSecurity" label="社保">
        <template slot-scope="scope">
          {{ scope.row.socialSecurity | switchType }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click="contract(scope.row)" type="text" size="small" v-if="userUuid === scope.row.createUser">
            转化已到期人
          </el-button>
          <el-button @click="information(scope.row)" type="text" size="small">
            出单信息登记
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="转化已到期人" :visible.sync="beexpiredVisible" width="600px" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="transForm" v-if="beexpiredVisible" :rules="transRules" ref="transForm" label-width="100px"
        class="demo-ruleForm" label-position="right">
        <el-form-item label="转化时间：" prop="beexpired">
          <el-date-picker v-model="transForm.beexpired" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beexpiredVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferOut">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="informationVisible" width="900px" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <add-information ref="informationForm" v-if="informationVisible" :rowData="rowData" :isShow="isShow">
      </add-information>
      <span slot="footer" class="dialog-footer" v-if="!isShow">
        <el-button @click="informationVisible = false">取 消</el-button>
        <el-button type="primary" @click="informationSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="titleCheck" :visible.sync="dialogVisible" width="600px" class="dialog-wrap"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <add-personal ref="personalForm" :isShow="isShowCheck" :rowData="rowDataCheck" v-if="dialogVisible">
      </add-personal>
      <span slot="footer" class="dialog-footer" v-if="!isShowCheck">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addInformation from './dialog/AddInformationForm.vue'
import addPersonal from './dialog/AddPersonal.vue'
import { timeStamp } from '../../util/date'
import { cloneDeep } from 'lodash'
export default {
  components: {
    addInformation,
    addPersonal
  },
  data () {
    return {
      dialogVisible: false,
      titleCheck: '',
      isShowCheck: true,
      rowDataCheck: null,
      title: '',
      userUuid: localStorage.getItem('userUuid'),
      informationVisible: false,
      beexpiredVisible: false,
      rowData: null,
      isShow: false,
      tableData: [],
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      uuid: '',
      transForm: {
        beexpired: []
      },
      transRules: {
        beexpired: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  filters: {
    switchType (val) {
      switch (val) {
        case 0:
          return '不唯一'
        case 1:
          return '唯一'
        default:
          return ''
      }
    }
  },
  mounted () {
    this.getList(this.current, this.size)
  },
  methods: {
    check (row) {
      this.titleCheck = '查看'
      this.dialogVisible = true
      this.isShowCheck = true
      this.rowDataCheck = row
    },
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/talentManage/getPageCoopList`, params).then(({ data }) => {
        if (data.success) {
          this.tableData = data.data.records
          this.total = data.data.total
        } else {
          this.$message({ type: 'error', message: data.msg })
        }
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.getList(this.current, val)
    },
    handleCurrentChange (val) {
      this.current = val
      this.getList(val, this.size)
    },
    information (row) {
      this.uuid = row.uuid
      if (this.userUuid === row.createUser) {
        if (row.contractUuid && row.contractUuid !== null) {
          this.$get(`/contractManage/registerInfoView/${row.contractUuid}`).then(({ data }) => {
            if (data.success) {
              this.isShow = false
              this.title = '编辑出单信息登记'
              this.informationVisible = true
              this.rowData = data.data
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          this.informationVisible = true
          this.title = '新建出单信息登记'
        }
      } else {
        this.$get(`/contractManage/registerInfoView/${row.contractUuid}`).then(({ data }) => {
          if (data.success) {
            this.isShow = true
            this.title = '查看出单信息登记'
            this.informationVisible = true
            this.rowData = data.data
          } else {
            this.$message.error(data.data.msg)
          }
        })
      }
    },
    contract (row) {
      // this.$EventBus.$emit('getAuthList')
      this.beexpiredVisible = true
      this.uuid = row.uuid
    },
    informationSubmit () {
      const form = this.$refs.informationForm
      form.$refs.taskForm.validate((valid) => {
        if (valid) {
          console.log(form.taskForm)
          const params = cloneDeep(form.taskForm)
          console.log(typeof params.talentPrice)
          params.receiptTime = timeStamp(params.receiptTime)
          params.businessTime = timeStamp(params.businessTime)
          params.finalProfit = Number(params.finalProfit)
          params.talentPrice = Number(params.talentPrice)
          params.contractPeriod = Number(params.contractPeriod)
          params.companyPrice = Number(params.companyPrice)
          params.years = Number(params.years)
          params.mixFee = Number(params.mixFee)
          params.talentUuid = this.uuid
          this.$post('/orderInfo/registerInfo', params).then(({ data }) => {
            if (data.success) {
              this.getList(this.current, this.size)
              this.informationVisible = false
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    // 转化已到期人
    transferOut () {
      console.log(this.transForm)
      this.$refs.transForm.validate((valid) => {
        if (valid) {
          this.$get(`/talentManage/conversionExpired/${this.uuid}`).then(({ data }) => {
            if (data.success) {
              this.$message.success(data.msg)
              this.getList(this.current, this.size)
              this.beexpiredVisible = false
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
