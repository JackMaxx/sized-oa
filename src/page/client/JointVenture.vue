<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 合作中的企业
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%" :span-method="arraySpanMethod" border>
      <el-table-column prop="businessName" label="公司名称"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="coopTalentName" label="合作对象"></el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click="information(scope.row)" type="text" size="small">
            出单信息登记
          </el-button>
          <el-button @click="disuse(scope.row)" type="text" size="small" v-if="userUuid === scope.row.createUser">
            淘汰
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="出单信息登记" :visible.sync="informationVisible" width="900px" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <add-information ref="informationForm" :isObj="isObj" :isShow="isShow" :rowData="rowData" v-if="informationVisible">
      </add-information>
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
import addPersonal from './dialog/EnterAddPersonal.vue'
export default {
  components: {
    addInformation,
    addPersonal
  },
  data () {
    return {
      isObj: false,
      dialogVisible: false,
      titleCheck: '',
      isShowCheck: true,
      rowDataCheck: null,
      userUuid: localStorage.getItem('userUuid'),
      informationVisible: false,
      isShow: false,
      tableData: [],
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      rowData: null
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
    filterData (arr, colIndex) {
      let spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          // businessName 表示表格数据第一列对应的参数字段，根据实际参数修改
          if (colIndex === 0) {
            if (item.businessName === arr[index - 1].businessName) {
              spanOneArr[concatOne] += 1
              spanOneArr.push(0)
            } else {
              spanOneArr.push(1)
              concatOne = index
            }
          }
        }
      })
      return {
        one: spanOneArr
      }
    },
    // 合并单元格
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // columnIndex 表示需要合并的列，多列时用 || 隔开
      if (columnIndex === 0) {
        const _row = this.filterData(this.tableData, columnIndex).one[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/businessManage/getPageCoopList`, params).then(({ data }) => {
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
      if (row.contractUuid && row.contractUuid !== null) {
        this.$get(`/contractManage/registerInfoView/${row.contractUuid}`).then(({ data }) => {
          if (data.success) {
            this.isShow = true
            this.rowData = data.data
            this.isObj = true
            this.informationVisible = true
          } else {
            this.$message.error(data.data.msg)
          }
        })
      } else {
        this.$message.error('暂无出单信息')
      }
    },
    disuse (row) {
      this.$confirm('确定要淘汰？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$get(`/orderInfo/disuse/${row.uuid}/${row.coopTalentUuid}`)
          .then((data) => {
            if (data.data.success) {
              this.getList(this.current, this.size)
              this.$message({
                type: 'success',
                message: data.data.msg
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
