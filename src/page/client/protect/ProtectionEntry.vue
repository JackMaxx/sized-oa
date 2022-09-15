<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 企业保护期
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="businessName" label="企业名称"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="contact" label="联系人"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click="contract(scope.row)" type="text" size="small">
            已签合同
          </el-button>
          <el-button @click="cancel(scope.row)" type="text" size="small" >
            取消保护
          </el-button>
          <!-- <el-button @click="note(scope.row)" type="text" size="small">
            小记
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
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
    <el-dialog title="沟通记录" :visible.sync="dialogNote" width="900px" class="dialog-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
      <add-note ref="personalForm" v-if="dialogNote" :orderUuid="orderUuid" :isView="isView"></add-note>
      <span slot="footer" class="dialog-footer" v-if="isView">
        <el-button @click="dialogNote = false">取 消</el-button>
        <el-button type="primary" @click="dialogNote = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addPersonal from '../dialog/EnterAddPersonal.vue'
import addNote from '../dialog/AddNote.vue'
export default {
  components: {
    addPersonal,
    addNote
  },
  data () {
    return {
      dialogNote: false,
      dialogVisible: false,
      isView: false,
      orderUuid: '',
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
  mounted () {
    this.getList(this.current, this.size)
  },
  methods: {
    note (row) {
      this.dialogNote = true
      this.orderUuid = row.uuid
      this.isView = false
    },
    check (row) {
      this.title = '查看'
      this.dialogVisible = true
      this.rowData = row
      this.isShow = true
    },
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/businessManage/getProtectList`, params).then(({ data }) => {
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
        type: 3,
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
        this.$get(`/businessManage/unprotect/${row.uuid}`)
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
