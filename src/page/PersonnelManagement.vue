<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 人员管理
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <div class="m-bottom10">
      <el-button type="primary" icon="el-icon-plus" @click="personalAdd">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realName" label="人员姓名"></el-table-column>
      <el-table-column prop="entryTime" label="入职时间"></el-table-column>
      <el-table-column prop="loginName" label="账号"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click="transfer(scope.row)" type="text" size="small">
            转出
          </el-button>
          <el-button @click="editPassword(scope.row)" type="text" size="small">
            修改密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="600px" class="dialog-wrap"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <add-personnel ref="personalForm" :rowData="rowData" v-if="dialogVisible"></add-personnel>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="转出" :visible.sync="transferOutVisible" width="600px" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="transForm" :rules="trans" ref="transForm" label-width="100px" class="demo-ruleForm"
        label-position="right">
        <el-form-item label="人员姓名：" prop="userUuid" v-if="transferOutVisible">
          <el-select v-model="transForm.userUuid" placeholder="请选择人员">
            <el-option v-for="(item, index) in personnelNameList" :label="item.realName" :value="item.uuid"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferOutVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferOut">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="changePasswordVisible" width="600px" class="dialog-wrap"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="map" :rules="rules" ref="updatePwd" label-width="100px" class="demo-ruleForm">
        <el-form-item label="当前密码：" prop="oldPwd">
          <el-input type="password" v-model="map.oldPwd" style="width: 414px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pwd">
          <el-input type="password" v-model="map.pwd" style="width: 414px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="cfmNewPassword">
          <el-input type="password" v-model="map.cfmNewPassword" style="width: 414px" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addPersonnel from './Dialog/AddPersonnel.vue'
import { timeStamp } from '../util/date'
import { base64 } from '../util/base64'
import { cloneDeep } from 'lodash'
export default {
  components: {
    addPersonnel
  },
  data () {
    const checkSame = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码！'))
      } else {
        if (value !== this.map.pwd) {
          callback(new Error('两次密码不一致！'))
        } else {
          callback()
        }
      }
    }
    return {
      changePasswordVisible: false,
      dialogVisible: false,
      transferOutVisible: false,
      title: '',
      personnelNameList: [],
      transForm: {
        userUuid: ''
      },
      tableData: [],
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      trans: {
        userUuid: [
          { required: true, message: '请选择人员', trigger: 'change' }
        ]
      },
      rowData: null,
      targetUuid: '',
      map: {
        oldPwd: '',
        pwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        cfmNewPassword: [
          { required: true, validator: checkSame, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getList(this.current, this.size)
  },
  methods: {
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/userInfo/getList`, params).then(({ data }) => {
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
    personalAdd () {
      this.title = '添加'
      this.dialogVisible = true
      this.rowData = null
    },
    edit (row) {
      this.title = '编辑'
      this.dialogVisible = true
      this.rowData = row
    },
    // 修改密码
    editPassword () {
      this.changePasswordVisible = true
    },
    // 保存修改密码
    submitForm () {
      this.$refs.updatePwd.validate((valid) => {
        if (valid) {
          // eslint-disable-next-line new-cap
          const encrypt = new base64()
          const send = {
            oldPwd: encrypt.encode(this.map.oldPwd),
            pwd: encrypt.encode(this.map.pwd)
          }
          this.$axios.post('/suninfo-userasset/userinfo/updateUserPwd', send).then(({ data }) => {
            if (data.success) {
              this.$message({
                type: 'success',
                message: data.msg
              })
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }
      })
    },
    transfer (row) {
      this.transferOutVisible = true
      this.targetUuid = row.uuid
      this.$post(`/userInfo/getAllList`, {}).then((res) => {
        if (res.data.success) {
          this.personnelNameList = res.data.data.filter(item => {
            return item.uuid !== row.uuid
          })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    confirm () {
      const form = this.$refs.personalForm
      form.$refs.taskForm.validate((valid) => {
        if (valid) {
          const params = cloneDeep(form.taskForm)
          params.entryTime = timeStamp(params.entryTime)
          if (this.title === '编辑') {
            params.uuid = this.rowData.uuid
          }
          this.$post('/userInfo/saveOrUpt', params).then(({ data }) => {
            if (data.success) {
              this.getList(this.current, this.size)
              this.dialogVisible = false
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    transferOut () {
      this.$refs.transForm.validate((valid) => {
        if (valid) {
          this.$get(`/userInfo/transferOut/${this.targetUuid}/${this.transForm.userUuid}`).then(({ data }) => {
            if (data.success) { // 记住用户名
              this.$message.success(data.msg)
              this.getList(this.current, this.size)
              this.transferOutVisible = false
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
<style lang="stylus"></style>
