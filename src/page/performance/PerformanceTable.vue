<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 业绩 / 业绩表
 * @Date: 2022.6.23
 -->
<template>
  <div class="">
    <div class="m-bottom10">
      <el-button type="primary" icon="el-icon-plus" @click="personalAdd">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="人员姓名"></el-table-column>
      <el-table-column prop="specialized" label="业绩目标"></el-table-column>
      <el-table-column prop="security" label="已完成目标"></el-table-column>
      <el-table-column prop="years" label="回款目标"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="600px">
      <add-personnel ref="personalForm"></add-personnel>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addPersonnel from '../Dialog/AddPerformance.vue'
// import { cloneDeep } from 'lodash'
export default {
  components: {
    addPersonnel
  },
  data () {
    return {
      dialogVisible: false,
      title: '',
      tableData: [
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        },
        {
          name: '王小虎',
          specialized: '计算机',
          security: '西安',
          years: 1,
          account: 'zhang'
        }
      ],
      currentPage4: 1
    }
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    personalAdd () {
      this.title = '添加'
      this.dialogVisible = true
    },
    edit () {
      this.title = '编辑'
      this.dialogVisible = true
    },
    confirm () {
      const form = this.$refs.personalForm
      form.$refs.taskForm.validate((valid) => {
        if (valid) {
          // const params = form.taskForm
          // console.log(params)
          // this.$post(`${global.server}/userLogin/login`, params).then((res) => {
          //   if (this.loginForm.rememberState) { // 记住用户名
          //     localStorage.rememberUserName = this.loginForm.username
          //     localStorage.rememberState = true
          //   }
          // })
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
