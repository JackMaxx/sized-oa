<!--
 * @Author: songyf
 * @LastEditors: songyf
 * @Description: 审核单
 * @Date: 2022.7.5
 -->
<template>
  <div class="">
    <el-button @click="refresh" type="primary" size="small" style="float:right;margin-bottom:16px;">
      刷新
    </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="typeName" label="类型"></el-table-column>
      <el-table-column prop="auditObj" label="审核对象"></el-table-column>
      <el-table-column prop="createUserStr" label="申请人"></el-table-column>
      <el-table-column prop="createTime" label="申请时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | filterTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="agree(scope.row, 1)" type="text" size="small">
            同意
          </el-button>
          <el-button @click="agree(scope.row, 0)" type="text" size="small">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/babel">
import { parseNumTime } from '../../util/date'
export default {
  components: {
  },
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      trans: {
        personnelName: [
          { required: true, message: '请选择人员', trigger: 'change' }
        ]
      }
    }
  },
  filters: {
    switchType (val) {
      switch (val) {
        case 1:
          return '个人'
        case 13:
          return '企业'
        default:
          return ''
      }
    },
    filterTime (val) {
      if (val) {
        return parseNumTime(val)
      }
    }

  },
  mounted () {
    this.getList(this.current, this.size)
  },
  methods: {
    refresh () {
      this.getList(this.current, this.size)
    },
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/orderInfo/getList`, params).then(({ data }) => {
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
    agree (row, value) {
      let str = ''
      let msg = ''
      if (value === 1) {
        str = '确定要同意？'
        msg = '已同意!'
      } else {
        str = '确定要拒绝？'
        msg = '已拒绝!'
      }
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$get(`/orderInfo/audit/${row.uuid}/${value}`)
          .then((data) => {
            if (data.data.success) {
              this.getList(this.current, this.size)
              this.$message({
                type: 'success',
                message: msg
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
