<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 企业公海
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <div style="margin-bottom:16px;">
      <el-input v-model="searchKey" placeholder="请输入专业" style="width:300px;"  @keyup.enter.native="searchAction">
        <el-button slot="append" @click="searchAction">查询</el-button>
      </el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="businessName" label="企业名称"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="contact" label="联系人"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="transfer(scope.row)" type="text" size="small">
            保护期
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      userUuid: localStorage.getItem('userUuid'),
      tableData: [],
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      searchKey: ''
    }
  },
  mounted () {
    this.getList(this.current, this.size, this.searchKey)
  },
  methods: {
    searchAction () {
      this.getList(this.current, this.size, this.searchKey)
    },
    getList (current, size, searchKey) {
      const params = {
        current: current,
        size: size,
        condition: {
          searchKey: searchKey
        }
      }
      this.$post(`/businessManage/getHighSeasList`, params).then(({ data }) => {
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
      this.getList(this.current, val, this.searchKey)
    },
    handleCurrentChange (val) {
      this.current = val
      this.getList(val, this.size, this.searchKey)
    },
    transfer (row) {
      this.$confirm('确定要保护？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$get(`/businessManage/protectBusiness/${row.uuid}`)
          .then((data) => {
            if (data.data.success) {
              this.getList(this.current, this.size, this.searchKey)
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
    }
  }
}
</script>
<style scoped>
</style>
