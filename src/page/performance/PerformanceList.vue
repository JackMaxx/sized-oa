<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 业绩 / 业绩榜
 * @Date: 2022.6.23
 -->
<template>
  <div class="banner">
    <img src="/static/image/banner.jpg" alt="">
    <div class="list">
      <div style="display:flex;margin-bottom:20px;align-items: center;">
        <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="选择起始时间" @change="getDateRangeStart" style="width:140px !important;"></el-date-picker>
        <div class="m-right10 m-left10" style="color: #fff;">--</div>
        <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="选择结束时间" @change="getDateRangeEnd" style="width:140px !important;"></el-date-picker>
        <el-button class="m-left20" type="primary" @click="getList">提 交</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" :summary-method="getSummaries" show-summary border>
        <el-table-column prop="ranking" label="名次"></el-table-column>
        <el-table-column prop="userName" label="人员姓名"></el-table-column>
        <el-table-column prop="amount" label="业绩"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/babel">
import { timeStamp } from '../../util/date'
export default {
  data () {
    return {
      tableData: [],
      startTime: '',
      endTime: ''
    }
  },
  mounted () {
    const M = parseInt(new Date().getMonth() + 1) > 10 ? parseInt(new Date().getMonth() + 1) : parseInt('0' + parseInt(new Date().getMonth() + 1))
    this.startTime = new Date().getFullYear() + '-' + M + '-01 00:00:00'
    const D = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    this.endTime = new Date().getFullYear() + '-' + M + '-' + D + ' 23:59:59'
    this.getList()
  },
  methods: {
    getList () {
      const params = {
        startTime: timeStamp(this.startTime),
        endTime: timeStamp(this.endTime)
      }
      this.$post(`/performanceManage/getList`, params).then(({ data }) => {
        console.log(data)
        if (data.success) {
          this.tableData = data.data && data.data.map((item, index) => {
            return {
              ranking: index + 1,
              userName: item.userName,
              amount: item.amount
            }
          })
        } else {
          this.$message({ type: 'error', message: data.msg })
        }
      })
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总业绩'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' '
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    getDateRangeStart (value) {
      const start = this.startTime
        ? new Date(this.startTime + ' 00:00:00').getTime() / 1000
        : 0
      const end = this.endTime ? new Date(this.endTime + ' 23:59:59').getTime() / 1000 : 0
      if (end) {
        if (start >= end) {
          this.$message({
            type: 'warning',
            message: '开始时间必须小于结束时间！'
          })
          this.startTime = null
        }
      }
    },
    getDateRangeEnd (value) {
      const start = this.startTime
        ? new Date(this.startTimeStr + ' 00:00:00').getTime() / 1000
        : 0
      const end = this.endTime ? new Date(this.endTime + ' 23:59:59').getTime() / 1000 : 0
      if (start) {
        if (start >= end) {
          this.$message({
            type: 'warning',
            message: '结束时间必须大于开始时间！'
          })
          this.endTime = null
        }
      }
    }
  }
}
</script>
<style scoped>
.banner {
  width: 100%;
  height: 100%;
}
.banner img {
  width: 100%;
  height: 100%;
}
.banner .list {
  position: absolute;
  top: 41%;
  width: 40%;
  left: 50%;
  margin-left: -12%;
  max-height: 350px;
  overflow-y: scroll; /*超出部分滚动不换行（overflow-x 横向 overflow-y纵向）*/
  white-space: nowrap; /*超出不换行，必须加，否则横向超出部分会自动换行*/
}
.banner .list::-webkit-scrollbar {
  display: none;
}
.banner .list /deep/ .el-table tr th {
  background-color: #e4393c;
}
.banner .list /deep/ .el-table tr td {
  background-color: #e4393c;
}

.banner .list /deep/ .el-table tr th div {
  color: #fff;
}
.banner .list /deep/ .el-table tr td div {
  color: #fff;
}
</style>
