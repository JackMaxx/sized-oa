<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 人才录入
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <div class="m-bottom10">
      <el-button type="primary" icon="el-icon-plus" @click="personalAdd">个人添加</el-button>
      <!-- <el-button type="primary" icon="el-icon-plus" @click="enterpriselAdd">企业添加</el-button> -->
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realName" label="人才姓名"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="socialSecurity" label="社保">
        <template slot-scope="scope">
          {{ scope.row.socialSecurity | switchType }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="years" label="年限"></el-table-column> -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click="protect(scope.row)" type="text" size="small" v-if="scope.row.expiryTime === null">
            保护期
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="600px" class="dialog-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
      <add-personal ref="personalForm" :isShow="isShow" :rowData="rowData" v-if="dialogVisible"></add-personal>
      <span slot="footer" class="dialog-footer" v-if="!isShow">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addPersonal from '../dialog/AddPersonal.vue'
// import { cloneDeep } from 'lodash'
export default {
  components: {
    addPersonal
  },
  data () {
    return {
      dialogVisible: false,
      title: '',
      tableData: [],
      userUuid: localStorage.getItem('userUuid'),
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      isShow: true,
      rowData: null
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
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/talentManage/getList`, params).then(({ data }) => {
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
      this.title = '个人添加'
      this.dialogVisible = true
      this.isShow = false
      this.rowData = null
    },
    check (row) {
      this.title = '查看'
      this.dialogVisible = true
      this.isShow = true
      this.rowData = row
    },
    edit (row) {
      this.title = '个人编辑'
      this.dialogVisible = true
      this.isShow = false
      this.rowData = row
    },
    protect (row) {
      this.$confirm('确定要保护？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$get(`/talentManage/protectTalent/${row.uuid}`)
          .then((data) => {
            if (data.data.success) {
              this.getList(this.current, this.size)
              this.$message({
                type: 'success',
                message: '保护成功!'
              })
            } else {
              this.$message.error(data.data.msg)
            }
          })
      }).catch(() => {
      })
    },
    confirm () {
      const form = this.$refs.personalForm
      console.log(form.taskForm)
      form.$refs.taskForm.validate((valid) => {
        if (valid) {
          const params = form.taskForm
          params.socialAreaShow = (params.socialAreaShow).toString()
          params.iphoneNumber = Number(params.iphoneNumber)
          params.alIphoneNumber = params.alIphoneNumber ? Number(params.alIphoneNumber) : null
          delete params.socialSecurityArea
          if (this.title === '个人编辑') {
            params.uuid = this.rowData.uuid
          }
          this.$post('/talentManage/saveOrUpt', params).then(({ data }) => {
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
    }
  }
}
</script>
<style scoped>
</style>
