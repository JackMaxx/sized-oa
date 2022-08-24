<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 个人保护期
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realName" label="人才姓名"></el-table-column>
      <el-table-column prop="profession" label="专业"></el-table-column>
      <el-table-column prop="socialSecurity" label="社保">
        <template slot-scope="scope">
          {{ scope.row.socialSecurity | switchType }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click="contract(scope.row)" type="text" size="small">
            已签合同
          </el-button>
          <el-button @click="cancel(scope.row)" type="text" size="small">
            取消保护
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
export default {
  components: {
    addPersonal
  },
  data () {
    return {
      dialogVisible: false,
      title: '',
      isShow: true,
      rowData: null,
      tableData: [],
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0
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
      this.title = '查看'
      this.dialogVisible = true
      this.isShow = true
      this.rowData = row
    },
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/talentManage/getProtectList`, params).then(({ data }) => {
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
    contract (row) {
      const param = {
        type: 1,
        auditObjUuid: row.uuid
      }
      this.$post('/orderInfo/save', param).then((data) => {
        if (data.data.success) {
          this.getList(this.current, this.size)
          this.$message({
            type: 'success',
            message: '正在审核中'
          })
        } else {
          this.$message.error(data.data.msg)
        }
      })
    },
    cancel (row) {
      this.$confirm('确定要取消保护？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$get(`/talentManage/unprotect/${row.uuid}`)
          .then((data) => {
            if (data.data.success) {
              this.getList(this.current, this.size)
              this.$message({
                type: 'success',
                message: '取消成功!'
              })
            } else {
              this.$message.error(data.data.msg)
            }
          })
      }).catch(() => {
      })
    }
  }
}
</script>
<style scoped>
</style>
