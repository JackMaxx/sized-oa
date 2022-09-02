<!--
 * @Author: songyf
 * @LastEditors: songyf
 * @Description: 公海-个人
 * @Date: 2022.7.5
 -->
<template>
  <div class="high-seas">
    <div class="m-bottom10">
      <el-button type="primary" icon="el-icon-plus" @click="batchImport">批量导入</el-button>
      <!-- <el-button type="primary" icon="el-icon-plus" @click="enterpriselAdd">企业添加</el-button> -->
    </div>
    <div style="margin-bottom:16px;">
      <el-input v-model="searchKey" placeholder="请输入专业" style="width:300px;" @keyup.enter.native="searchAction">
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
          <el-button @click="note(scope.row)" type="text" size="small">
            小记
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="导入" :visible.sync="importDialogFlag" width="600px" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-upload v-if="importDialogFlag" :action="uploadObjUrl" ref="upload" :auto-upload="false"
        :on-success="uploadSuccess" :on-change="onChangeHandler" :on-error="uploadError" :file-list="fileList"
        style="width:100%;text-align:none!important;">
        <el-button type="primary" slot="trigger">选取文件</el-button>
        <el-button @click="upload" type="primary" :disabled="uploadBtnFlag" style="margin-left: 4px">点击上传</el-button>
        <div class="underLine" @click="downloadTemplate">
          <i class="iconfont icon-download" style="margin-right: 6px; color: #199fed;"></i>点击此处下载导入模板"
        </div>
      </el-upload>
    </el-dialog>
    <el-dialog title="沟通记录" :visible.sync="dialogNote" width="900px" class="dialog-wrap" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <add-note ref="personalForm" v-if="dialogNote" :orderUuid="orderUuid" :isView="isView"></add-note>
      <span slot="footer" class="dialog-footer" v-if="isView">
        <el-button @click="dialogNote = false">取 消</el-button>
        <el-button type="primary" @click="dialogNote = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addNote from '../client/dialog/AddNote.vue'
import { getDownload } from '@/util/tool.js'
export default {
  components: {
    addNote
  },
  data () {
    return {
      dialogNote: false,
      isView: false,
      orderUuid: '',
      importDialogFlag: false,
      uploadBtnFlag: false,
      fileList: [],
      fileTypes: ['xls', 'xlsx'],
      uploadObjUrl: `${window.location.origin}/talentManage/importTalentInfo`,
      downUrl: `talentManage/downTalentTemplate`,
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
    note (row) {
      this.dialogNote = true
      this.orderUuid = row.uuid
      this.isView = false
    },
    upload () {
      if (this.$refs.upload.uploadFiles.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少上传一个文件'
        })
      } else {
        this.uploadBtnFlag = true
        this.$refs.upload.submit()
      }
    },
    onChangeHandler (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (this.fileTypes) {
        const type = file.name.split('.').pop()
        const message = `请选择${this.fileTypes.toString().replace(',', '或')}类型的文件`
        if (this.fileTypes.indexOf(type) === -1) {
          this.$message({
            type: 'error',
            message: message
          })
          fileList.pop()
        }
      }
    },
    uploadSuccess (respon, file) {
      const res = respon.data
      this.uploadBtnFlag = false
      if (!respon.success) {
        this.$message({
          type: 'error',
          message: '导入失败！'
        })
        return
      }
      if (!respon.data.checkTemplate) {
        this.$message({
          type: 'error',
          message: '模板不正确，请下载最新模板！'
        })
        return
      }
      // if (this.saveLog) {
      const result = res.successNum > 0 ? '成功' : '失败'
      this.$axios.log({
        data: [file],
        logTemplate: `导入|${this.modelName}(${file.name})`,
        result: `${result}`
      })
      // }
      this.successData.failNum = res.failNum
      this.successData.successNum = res.successNum
      this.successData.fileName = res.fileName || []
      this.successData.licenseStatus = res.licenseStatus || ''
      this.$refs.upload.uploadFiles = []
    },
    uploadError () {
      this.uploadBtnFlag = false
      this.$message({
        type: 'error',
        message: '上传失败'
      })
    },
    downloadTemplate () {
      getDownload(this.downUrl)
    },
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
    batchImport () {
      this.importDialogFlag = true
      this.$post('/talentManage/importTalentInfo', {}).then(({ data }) => {
        if (data.success) {
          this.getList(this.current, this.size, this.searchKey)
        }
      })
    },
    transfer (row) {
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
    }
  }
}
</script>
<style scoped>
.high-seas .underLine {
  float: right;
  margin-top: 6px;
  cursor: pointer;
  color: #199fed;
  width: 350px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>
