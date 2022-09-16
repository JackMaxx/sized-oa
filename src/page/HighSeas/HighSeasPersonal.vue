<!--
 * @Author: songyf
 * @LastEditors: songyf
 * @Description: 公海-个人
 * @Date: 2022.7.5
 -->
<template>
  <div class="">
    <div style="margin-bottom:16px;">
      <el-input v-model="searchKey" placeholder="请输入专业" style="width:300px;"  @keyup.enter.native="searchAction">
        <el-button slot="append" @click="searchAction">查询</el-button>
      </el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realName" label="人才姓名"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="socialSecurity" label="社保">
        <template slot-scope="scope">
          {{ scope.row.socialSecurity | switchType }}
        </template>
      </el-table-column>
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
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      this.$post(`/talentManage/getHighSeasList`, params).then(({ data }) => {
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
    transfer (row) {
      this.$confirm('确定要保护？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$get(`/talentManage/protectTalent/${row.uuid}`)
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
